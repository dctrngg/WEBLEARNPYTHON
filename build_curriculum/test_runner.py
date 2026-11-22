import sys
import io

def run_solver(code_str, input_str):
    """Executes code_str with input_str redirected to stdin and captures stdout."""
    old_stdin = sys.stdin
    old_stdout = sys.stdout
    sys.stdin = io.StringIO(input_str)
    sys.stdout = io.StringIO()
    try:
        # Create clean global environment
        glob = {}
        exec(code_str, glob)
        output = sys.stdout.getvalue()
        # Normalize newlines and strip trailing whitespace on each line
        lines = [l.rstrip() for l in output.strip().splitlines()]
        return "\n".join(lines)
    finally:
        sys.stdin = old_stdin
        sys.stdout = old_stdout

def verify_assignment(asgn, solver_code):
    """Verifies that solver_code produces exact expectedOutput for all testCases in asgn."""
    for i, tc in enumerate(asgn["testCases"]):
        inp = tc["input"]
        exp = tc["expectedOutput"].strip()
        actual = run_solver(solver_code, inp)
        if actual != exp:
            print(f"FAILED on {asgn['id']} - TC {i+1}")
            print(f"Input:\n{inp}")
            print(f"Expected:\n{exp}")
            print(f"Actual:\n{actual}")
            raise AssertionError(f"Mismatch in {asgn['id']} testcase {i+1}")
    print(f"✓ {asgn['id']} ({len(asgn['testCases'])} tests passed)")
