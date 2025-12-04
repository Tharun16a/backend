\# AI Agent Workflow Log



\## Agents Used

\- ChatGPT (GPT-5.1) — architecture planning, debugging, TypeScript generation.

\- GitHub Copilot — inline coding suggestions.

\- Cursor AI — refactoring and organising project structure.



---

\## Prompts \& Outputs



\### 1. Express Server Setup

Prompt: "Create a minimal Express server in TypeScript."



AI Output (excerpt):

const app = express();

app.use(cors());

app.use(express.json());

app.listen(4000);



Validation:

Used as the base and extended into a hexagonal architecture.



---

\### 2. Compliance Balance Formula



Prompt: "Write computeCB using FuelEU rules."



AI Output:

const cb = (TARGET - actual) \* energy;



Corrections Made:

\- Applied correct target intensity: 89.3368 gCO₂e/MJ

\- Used correct energy constant: 41,000 MJ per ton

\- Returned values as { energyInScope, cb }



---

\### 3. Pooling Algorithm (Article 21)



Prompt: "Implement greedy pooling so deficit ships don’t exit worse."



Issues in AI Output:

\- Missing validation that total CB must be ≥ 0

\- Surplus ships could become negative

\- Arrays were mutated directly

\- Some FuelEU rules were not enforced



Fixes Added:

\- Added validation for pool sum

\- Deep-copied arrays to avoid mutation

\- Ensured surplus ships never go negative

\- Ensured deficit ships do not exit with a worse CB



---

\## Validation / Corrections



AI occasionally:

\- Missed exact FuelEU constants

\- Mutated arrays directly

\- Skipped certain pooling and banking edge cases

\- Mixed domain logic with adapter logic



How I validated correctness:

\- Performed manual CB calculations

\- Tested endpoints using PowerShell and curl

\- Logged intermediate CB values

\- Ensured behavior matched Articles 20 \& 21 of FuelEU Maritime regulation



---

\## Observations



Where AI helped:

\- Fast boilerplate creation (Express setup, routers, TypeScript types)

\- Structuring the project using hexagonal architecture

\- Improving repetitive TypeScript logic

\- Debugging small code issues quickly



Where AI struggled:

\- PowerShell curl syntax differences

\- Handling complex pooling edge cases

\- Applying strict FuelEU calculations correctly

\- Maintaining clean separation of domain logic and adapters



Effective Workflow:

\- ChatGPT → architecture, business logic, and debugging

\- GitHub Copilot → inline code suggestions

\- Cursor AI → refactoring and code organisation



---



\## Best Practices Followed



\- Verified all AI-generated logic manually

\- Kept all business logic inside /core/application

\- Avoided mixing Express or framework code with domain logic

\- Used an iterative workflow: generate → review → refine → test

\- Ensured calculations fully align with FuelEU Maritime requirements



---

END OF FILE



