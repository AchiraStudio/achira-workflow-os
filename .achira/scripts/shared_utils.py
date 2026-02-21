import sys
import os
import subprocess
from pathlib import Path
from typing import List, Optional

# ANSI Colors
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'='*70}")
    print(f"{text.center(70)}")
    print(f"{'='*70}{Colors.ENDC}\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

def resolve_achira_path(base_path: Path) -> Path:
    """Ensure we find the .achira directory even if run from subfolders."""
    curr: Path = base_path.resolve()
    for _ in range(5):  # search up to 5 levels
        if (curr / ".achira").exists():  # type: ignore
            return curr / ".achira"  # type: ignore
        if curr.parent == curr:  # type: ignore
            break
        curr = curr.parent  # type: ignore
    return base_path / ".achira"

def get_python_cmd() -> List[str]:
    """Return the python command, preferring 'uv run' if available."""
    try:
        # Check if uv is installed and in path
        subprocess.run(["uv", "--version"], capture_output=True, check=True)
        return ["uv", "run", "python"]
    except (subprocess.CalledProcessError, FileNotFoundError):
        return [sys.executable or "python"]

def run_command(cmd: List[str], cwd: Optional[str] = None, timeout: int = 600) -> subprocess.CompletedProcess:
    """Run a system command with capture."""
    return subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=True,
        text=True,
        timeout=timeout
    )
