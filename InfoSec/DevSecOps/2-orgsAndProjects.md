## Organizations & Projects ##
> OWASP (Open Worldwide Application Security Project)
    -> [ZAP (Zed Attack Proxy)](https://www.zaproxy.org/docs/docker/baseline-scan/)
        \-> penetration testing tool
            ^-> works as a proxy (Main-in-the-middle) between the web app and the user, intercepting/inspecting all of the trafic
                +-> provides alerts explaining the triggered vulnerabilities found in the tested web app
                    \\-> Pen testing: Desktop UI
                    \\-> DevSecOps|CI/CD: Docker containers
                
                +-> tutorials: [ZAP In Ten](https://www.zaproxy.org/videos-list/)

    -> [Top Ten](https://owasp.org/www-project-top-ten/)
        \-> documentation of the top most critical web security concerns
            ^-!> PS: based on the [2025 document](https://owasp.org/Top10/2025/)
            
            ^-> A01 - Broken Access Control
                +-> users being able to act outside their intended permissions
                    \\-> eg: users able to act as admins

            ^-> A02 - Security Misconfiguration
                +-> non-secure configuration
                    \\-> eg: admin role being as the default user / no hardening taking place (disabling services, ports, accounts, etc.)

            ^-> A03 - Software Supply Chain Failures
                +-> building/distributing/updating the software begins to break due to vulnerabilities/malicious changes in third-party code/tools/dependencies

            ^-> A04 - Cryptographic Failures
                +-> failures related to (or lack of) cryptography, leading to sensitive data exposure
                    \\-> eg: using deprecated logics (SSLv3 instead of TLS 1.2/1.3) / not using any form of cryptography for API communication

            ^-> A05 - Injection
                +-> usage of SQL/OS Command/LDAP to get unauthenticated access to an application
                    \\-> eg: due to incorrect user input validation, an SQL injection can occour to get access to a system
                        //-!> OBS: always validade both server & client-side!

            ^-> A06 - Insecure Design
                +-> when an application didn't have security in mind during development, the implementation of security later on is pointless
                    \\-> eg: lack of secure development lifecycles

            ^-> A07 - Authentication Failures
                +-> the system accepts an incorrect/invalid user as legitimate due to automated brute-force, credential stuffing, and so on
                    \\-> eg: attacker uses variations or increments of spilled credentials to gain access, for instance trying Password1!, Password2!, Password3!
                    \\-> eg2: allowing the user to reset their password/credentials with "knowledge-based answers" instead of MFA

            ^-> A08 - Software or Data Integrity Failures
                +-> code/infra that wasn't built to protect against integrity validations
                    \\-!> OBS: the "I" in ['CIA Triad'](./1-testingAndTooling.md/#principles)

            ^-> A09 - Security Logging & Alerting Failures
                +-> little to no logging/monitoring of the application's components, making breach detections difficult

            ^-> A10 - Mishandling of Exceptional Conditions
                +-> the software fails to prevent/detect/respond to unusual/unpredictable situations due to poor/missing input validation or late/high level error handling
                    \\-> eg: user tries to access a page with the URL, but the system stops responding
                    \\-> eg2: user sets the value of a number field using DevTools to a letter string, sends it over the submit button, and the system crashes

    -> [ASVS (Application Security Verification Standard)](https://owasp.org/www-project-application-security-verification-standard/)
        \-> [list of requirements](https://github.com/OWASP/ASVS/tree/v5.0.0#latest-stable-version---500) for secure application development
            ^-> provides a basis for testing a web application's technical security controls

    -> [Cheatsheets](https://cheatsheetseries.owasp.org/index.html)
        \-> simplified good-practices for application security
            ^-!> PS: it pairs well with all of the above! 


> CIS (Centre of Internet Security)
    -> non-profit that helps others against cyber threats

    -> [Benchmarks](https://www.cisecurity.org/cis-benchmarks)
        \-> configuration guidelines for multiple products
            ^-!> OBS: a good checklist to verify if the product is safe/in need to be hardened
                \\-!> PS: there are tools to automate this process after getting the hang of it!
            ^-!> OBSS: focuses on hardening specific OSs/middleware/apps/network devices 

    -> [Controls](https://www.cisecurity.org/controls/cis-controls-list)
        \-> general set of recommended best practices for securing an organisation and its data
            ^-!> PS: covers the security of a more general range of systems and devices


> CISA (Cybersecurity and Infrastructure Security Agency)
    -> US federal agency that provides info on how to defend against cyber/infra threats
        ^-> eg: known exploitable vulnerabilities (CVEs) catalogue / alerts (news feed for current threats)
            +-!> PS: many countries have their own (UK == NCSC), but CISA is applicable regardless


## Projects ##
> CVEs (Common Vulnerabilities and Exposures)
    -> managed by MITRE, it identifies, defines, and catalogue public cybersec vulnerabilities (CVE-YEAR-ID)
        ^-!> PS: always good to be aware of relevant [CVEs](https://www.cve.org/) for the stack at hand!
            +-> some good fonts for keeping on with them
                \\-> [Krebs](https://krebsonsecurity.com/)
                \\-> [Threatpost](https://threatpost.com/)

> CVSS (Common Vulnerability Scoring System)
    -> managed by FIRST, it defines how critical a vulnerability/CVE currently is
        ^-> low, medium, high, and critical
            +-!> PS: a [calculator](https://cve.tools/cvss) can be used to determine said level

> EPSS (Exploit Prediction Scoring System)
    -> also managed by FIRST, it's a daily estimate of the [probability [0->1]](./src/epssRating.png) of exploitation of a CVE for the next 30 days
        ^-!> helps with determining patch priority for [CVEs](https://www.cvedetails.com/) 
        ^-!> OBS: doesn't replace CVSS, but rather it compliments it
            +-> eg: High EPSS (0.9) + Critical CVSS (9.0) > Low EPSS (0.2) + Critical CVSS (10.0)