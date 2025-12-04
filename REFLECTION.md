\# Reflection on the Development Process



This project was built to implement key parts of the FuelEU Maritime regulation using a clean, modular backend architecture. I approached the assignment by breaking it into clear stages: route handling, compliance calculations, banking (Article 20), and pooling (Article 21). Throughout the process, I used AI tools carefully while making sure I understood and validated every piece of logic myself.

\## What I Learned



Working on this backend taught me how to structure a real project using hexagonal architecture. I learned how to separate domain logic from HTTP routes, how to design pure functions for compliance calculations, and how to validate rules from FuelEU Maritime (especially Articles 20 and 21). I also learned how important it is to test each endpoint manually to confirm that the logic behaves correctly.

\## Use of AI Tools



AI tools were helpful for speeding up repetitive tasks and generating boilerplate. ChatGPT helped with reasoning about architecture and formulas, Copilot suggested quick inline fixes, and Cursor AI helped reorganise code during refactoring.  



However, I made sure that the final decisions were mine. For important parts like the compliance balance formula, banking rules, and pooling logic, I reviewed the generated output, checked it against the regulation, and corrected any mistakes.

\## Challenges Faced



One of the bigger challenges was understanding how FuelEU Maritime rules translate into code. The compliance balance formula, energy calculations, and the logic for banking and pooling all required careful interpretation. PowerShell curl syntax also caused some issues during testing, and I had to adjust the requests manually.  



The pooling algorithm was especially tricky because it must ensure no ship exits worse after pooling. I had to validate the pool sum, protect surplus ships, and avoid mutating arrays directly.

\## Overall Reflection



This assignment helped me understand how to combine technical skills with regulatory requirements. I learned how to structure a clean backend, how to test each part manually, and how to think critically about AI-generated suggestions instead of accepting them blindly.  



Overall, the project improved my confidence in building TypeScript backends, interpreting domain rules, and maintaining clean architecture throughout.



---

END OF FILE



