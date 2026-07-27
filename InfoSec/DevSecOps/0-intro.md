## DevSecOps ##
> DevOps: dev + IT operations to make release cycles shorts/quicker
    -!> aka automation as much as possible (eg: infra via pipelines [Jenkins])
        \-> create & maintain CI/CD pipelines to leverage code releases
    
        \-> '' envs/infra for development/testing of SDLC (Software Development Life Cycle)
            ^-> Planning
            ^-> Analysis
            ^-> Project
            ^-> Programming
            ^-> Testing
            ^-> Implementation
            ^-> Maintenance

        \-> it manages multiple stacks at once
            ^-> Version control (Git, SVN (Apache))
            ^-> CI/CD (Jenkins, GitLab, GitHub, Azure DevOps)
            ^-> Infra (Docker, VMs/Vagrant, Terraform)
            ^-> Cloud (Azure, AWS, GCP)
            ^-> Configuration Manager (Ansible, Chef)

> DevSecOps: adding a security layer to [SDLC's workflow](./src/sdlcWorkflow.png), and making it the priority
    -> can be achieved by adding [security steps](./1-testingAndTooling.md/#principles) to existing pipelines, or creating new ones altogether via:
        \-> SAST (Static Application Security Testing)
            +-> applications made to test the security of the code, as well as point the exact location of the vulnerability
            \-> eg: SonarQube, Horusec
        \-> DAST (Dynamic '')
            \-> eg: OWASP ZAP
        \-> SCA (Software Composition Analysis)
            \-> eg: Snyk, OWASP Dependencies
        \-> Ensuring best practices are followed & issues are prioritised and understood by everyone involved in SDLC

    -> also achieved by pushing the DevSecOps mindset forward
        \-> training staff with secure design/principles/how to's of secure development