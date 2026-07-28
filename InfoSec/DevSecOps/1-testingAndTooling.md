## Principles ##
> [Defence in depth](https://wiki.owasp.org/index.php/Defense_in_depth)
    -> never rely on a single line of defence, but rather multiple layers of security
        ^-!> PS: it's not about the ammount, but how each step complement the other
        ^-> eg: [Login page's defence](./src/loginDefence.png)
            +-> strong password reqs
            +-> CAPTCHA needed after multiple failed attempts
            +-> MFA
            +-> email confirmation (if from an unknown IP/country)

> [Least privilege](https://owasp.org/www-community/Access_Control)
    -> users shouldn have minimal power to just access what they're supposed to
        ^-> eg: a [temporary account](./src/linux/linuxPermissionOwners.png) shouldn't have [admin privileges](./src/linux/linuxPermissionSymbols.png) | a server/service account(machine) shouldn't have domain admin, interactive login access, or shell usage. Rather, it should have access restrictly to [specific file(s)/folder(s)](./src/linux/linuxPermissionChangeOwner.png), or with [read-only permissions](./src/linux/linuxPermissionValue.png), etc.
            \\-!> OBS: the [3rd module](./3-linuxFundamentals.md) goes further into this

> Authentication X Authorisation
    -> authen.: credentials
    -> autho.: permissions

> [CIA Triad](https://www.fortinet.com/br/resources/cyberglossary/cia-triad)
    -!> the foundation of any info sec program

    -> Confidentiality
        ^-> ensuring data is kept safe and unavailable from unothorised access
            +-> eg: the need of authorisation to reach X file, and file encryption on top

    -> Integrity
        ^-> making sure that the data is accurate/hasn't been modified/tampered with
            +-> eg: digital signatures/SSL certificates on websites for platform authenticity ('google.com' is actually Google because it has Google's signature/certificate embedded to it)
                \\-> PS: things to look for:
                    //-> Validity/Expiration dates
                    //-> Subject Alternative Name (SAN) / Common Name matching the URL's
                    //-> Issued by a recognized Certificate Authority (CA)

    -> Availability
        ^-> ensuring data/systems are available
            +-> eg: if a denial of service attack (DoS) would be applied against the system, methods should be employed to protect against such
                \\-> such as having redundant/backup networks/apps/databases ready-to-go, so user/clients can still access the systems, and monitor the influx to make sure they don't get compromised as well



## Security Steps & Tools ##
> SAST (Static Application Security Testing)
    -> [tools](https://owasp.org/www-community/Source_Code_Analysis_Tools) used for finding, and direct towards, vulnerabilities inside the (Static) code
        ^-> earlier stages of development
        ^-> can be added to the IDE for that
        ^-> a form of white-box testing (Unit/Integration/Regression Testing) [structure/implementation based on source code]
            +-> tests code paths, conditions, loops, and logic
            +-> Unit: code-oriented
                \\-> checks if it runs
            +-> Integration: interfaces' interactions
                \\-> verifies the resulting behaviour out of the set interactions 
            +-> Regression: recycled tests from the previous levels
    
    -> Ups:
        ^-> doesn't need the application to be running to work (Static --)
        ^-> scales well and can be run (repeatedly) in a multitude of softwares (nightly builds / continuous integration <CI/CD step>) [no down-time]
        ^-> good for identifying common vulnerabilities
            +-> Buffer overflows
            +-> SQL injection flaws
        ^-> good for finding the exact spot of the vulnerability (filename, location, line number, and code snipet)
    
    -> Downs:
        ^-> current SAST tools are limited, and can only handle a small portion of application security flaws out-of-the-box
        ^-> it's not as good to find other security risks
            +-> authentication problems
            +-> access control issues
            +-> insecure use of cryptography
            +-> configuration issues (since it's not code)
        ^-> high number of false positives
        ^-> even when finding a security issue, it's hard to "prove" that it's an actual vulnerability (no given context, only the location)
        ^-> it struggles to analyse uncompillable code
            +-> incorrect libs
            +-> no compilation instructions
            +-> missing required code

> DAST (Dynamic Application Security Testing)
    -> [tools](https://owasp.org/www-community/Vulnerability_Scanning_Tools) used for testing insecure server configuration at runtime (Dynamic)
        ^-> later stages of development
        ^-> scans the web application from the outside-in, simulating attacks to identify the vulnerabilities
            +-> Cross-site scripting (XSS)
            +-> SQL injection
            +-> Command injection
            +-> Path Traversal
        ^-> more of a black-box form of testing (Input-Output testing) [functionality w/o code]
            +-> validates functional reqs and user expectation
                \\-> eg: validate UI/API's login/authentication
    
    -> Ups:
        ^-> low false-positives
        ^-> catches runtime-specific issues
            +-> server configuration
            +-> business logic flaws
        ^-> easily retestable via automation on CI/CD pipelines
    
    -> Downs:
        ^-> since it's used on later stages, patching can be bothersome
        ^-> no code traceability
        ^-> struggles with complex authentication/business logic errors

> SCA (Software Composition Analysis)
    -> [tool](https://owasp.org/www-community/Source_Code_Analysis_Tools) for verifying if dependency trees/graphs have their dependencies up-to-date and if such versions are vulnerable to any CVEs (Common Vulnerabilities and Exposures)
        ^-> a form of SAST, since it tests what's in the source code (dependencies file) [made for CI/CD]
        ^-> tests the software's dependencies/components for known vulnerabilities (↑ open source components), and flags if the lib has security issues
            +-> eg: Snyk

> CNAPP (Cloud Native Application Protection Platform)
    -> integrated security solution (multiple-tools-into-one) accross the entire lifecycle of a cloud-native app
        ^-!> PS: usually agentless

        ^-> CSPM (Cloud Security Posture Management)
            +-> defines/validates infra config to find security issues
                \\-> eg: Wiz, Microsoft Defender, Palo Alto

        ^-> CWPP (Cloud Workload Protection Platform)
            +-> detects anomalies/malwares/vulnerabilities based on the VMs/Containers/Functions workloads
                \\-> eg: Microsoft Defender, Orca Security, Wiz
        
        ^-> CIEM (Cloud Infrastructure Entitlement Management)
            +-> manages credentials & permissions for the resources (human's or machine's)
                \\-> eg: removes excessive/toxic permissions from users (Least privilege)
                \\-> tools: Microsoft Entra Permissions Management, SailPoint Identity Security, Wiz/Orca Security
        
        ^-> IaC
            +-> infra's code check before it going live [CI/CD]
                \\-> eg: Terraform, ARM, CloudFormation
    
    -> scans the cloud, integrating the source code, to find the source of the problem
    -> can also englobe tools such as SCA, runtime monitoring, and more


## Testing and Vulnerabilities ##
> Penetration Testing
    -!> PS: it's usually manual, but automation is possible (but harder)
        ^-> OBS: should happen regularly, but since it's manual and costly it's usually scheduled on an annual basis
    -> authorised security test against an app/environment to evaluate its safety
        ^-> commonly it's the exploit of vulnerabilities to see how far said exploit can go
            \-> can be a white/black/grey-box (mix) test

> Vulnerability Assessment/Scanning
    -!> PS: since it's not reliant on manual intervention, so they can be automated [CI/CD pipeline] 
    -> similar to pen test since it tries to identify vulnerabilities within an application/env
        ^-> diff: it's not about exploiting, but rather reporting what was found

> Privilege Escalation
    -> go from an unprivileged account to a privileged one (eg: root), when you're not "allowed" to
        ^-> plentiful of ways to do such, and some are:
            +-> Kernel exploits
                ++-> they're usually based on CVEs

            +-> Explointing services/programs running elevated
                ++-> insecure configuration of such can lead to them being stepping stones for the escalation

            +-> Weak/plaintext password usage
                ++-> users saving passwords as plaintext on their machines

            +-> Misconfiguration
            +-> World writable scripts
                ++-> global scripts that can be accessed by anyone

            +-> Cron misconfiguration
                ++-> scheduled tasks that can be manipulated for such

    -> ways to combat this is through testing for Linux privilege escalation enumeration via scripts
        ^-> egs:
            +-> Active
                ++-> [LinPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS) / LinPEAS-ng
                    \\-> comprehensive and in-depth
                    \\-> good for audits

                ++-> [lse.sh](https://github.com/diego-treitos/linux-smart-enumeration/tree/master)
                    \\-> minimalist and fast (not as detailed)
                    \\-> good for "sanity checks"
            
            +-> Legacy
                ++-> [LinEnum](https://github.com/rebootuser/LinEnum)
                ++-> [unix-privesc-check](https://pentestmonkey.net/tools/audit/unix-privesc-check)

            +-> Defunct
                ++-> [linprivchecker](https://github.com/sleventyeleven/linuxprivchecker)