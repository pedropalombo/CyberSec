## Security Steps ##
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
    -> integrated (multiple-tools-into-one) security solution accross the entire lifecycle of a cloud-native app
        +-> usually agentless
        +-> CSPM (Cloud Security Posture Management)
            ^-> defines/validates infra config to find security issues
                \\-> eg: Wiz, Microsoft Defender, Palo Alto
                

        +-> CWPP (Cloud Workload Protection Platform)
            ^-> detects anomalies/malwares/vulnerabilities based on the VMs/Containers/Functions workloads
                \\-> eg: Microsoft Defender, Orca Security, Wiz
        
        +-> CIEM (Cloud Infrastructure Entitlement Management)
            ^-> manages credentials & permissions for the resources (human's or machine's)
                \\-> eg: removes excessive/toxic permissions from users (Least privilege)
                \\-> tools: Microsoft Entra Permissions Management, SailPoint Identity Security, Wiz/Orca Security
        
        +-> IaC
            ^-> infra's code check before it going live [CI/CD]
                \\-> eg: Terraform, ARM, CloudFormation
    
    -> scans the cloud, integrating the source code, to find the source of the problem
    -> can also englobe tools such as SCA, runtime monitoring, and more
