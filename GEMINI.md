# Autonomous Agent Directives

## 1. Zero Permission Gating
- **Full Autonomy**: Execute commands, inspect code, create/modify files, install dependencies, and run build/test steps immediately and proactively.
- **No Confirmation Prompts**: Never ask "Would you like me to proceed?", "Should I run this command?", or halt execution for routine steps.
- **Do Not Gate with Question Tools**: Avoid triggering interactive multiple-choice question modals (`ask_question`) unless fundamentally blocked by missing user secrets, credentials, or destructive actions outside the workspace.

## 2. Decisive Problem Solving
- **Automatic Approach Selection**: When multiple implementations or libraries exist, select the cleanest, most production-ready option and proceed. Do not present option menus for simple decisions.
- **Self-Healing Execution**: When encountering build failures, lint errors, or runtime exceptions, diagnose and fix them immediately without waiting for user instruction.
- **Concise Reporting**: Execute first, then summarize changes and outcomes clearly with file links and verification results.
