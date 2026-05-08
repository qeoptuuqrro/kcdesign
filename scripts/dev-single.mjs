import { execFileSync, spawn } from "node:child_process";
import { realpathSync } from "node:fs";
import process from "node:process";

const PORTS = [5173, 5174];
const HOST = "127.0.0.1";
const PORT = 5174;
const projectRoot = realpathSync(process.cwd());
const projectFolderName = projectRoot.split(/[\\/]/).pop();

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

function listeningPids(port) {
  const output = run("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"]);
  return [...new Set(output.split(/\s+/).filter(Boolean).map(Number).filter(Boolean))];
}

function cwdForPid(pid) {
  const output = run("lsof", ["-a", "-p", String(pid), "-d", "cwd", "-Fn"]);
  const cwdLine = output.split("\n").find((line) => line.startsWith("n"));
  if (!cwdLine) return "";

  try {
    return realpathSync(cwdLine.slice(1));
  } catch {
    return cwdLine.slice(1);
  }
}

function stopDuplicateDevServers() {
  for (const port of PORTS) {
    for (const pid of listeningPids(port)) {
      if (pid === process.pid) continue;

      const pidCwd = cwdForPid(pid);
      const isSameProjectRoot = pidCwd === projectRoot;
      const isCodexWorktreeCopy =
        pidCwd.includes(`${process.env.HOME}/.codex/worktrees/`) && pidCwd.endsWith(`/${projectFolderName}`);

      if (!isSameProjectRoot && !isCodexWorktreeCopy) continue;

      console.log(`Stopping old dev server on port ${port} (pid ${pid})`);
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        // If the process already exited, there is nothing left to clean up.
      }
    }
  }
}

stopDuplicateDevServers();

console.log(`Starting single source of truth dev server: http://${HOST}:${PORT}/`);

const vite = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vite", "--host", HOST, "--port", String(PORT), "--strictPort"],
  {
    cwd: projectRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      BROWSER: "none",
    },
  }
);

vite.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
