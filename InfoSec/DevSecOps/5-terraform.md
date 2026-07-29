## [Terraform](https://developer.hashicorp.com/terraform) ##
> What is it?
    -> an IaC (Infrastructure as Code) tool that allows multi-cloud infra management in one place/pipeline
        ^-> IaC
            +-> enables infrastructure (hardware specs) to live as code
                #-> benefits from version control, peer reviews, and so on
                #-> changes to the infra (creation/destruction) can be automated [CI/CD]
                    ++-> other without IaC knowledge can use it
    
    -> makes changes safer and easier to establish, and quicker to deploy than manual efforts
        ^-> eg: create exactly the same infra across multiple envs w/o human error

> Recommendations
    -> never store secrets in [plaintext](./src/terraform/terraformSecrets.png)
        ^-> use env vars for credentials
            +-> eg: pipeline env vars (encryption - easiest)

            +-> OR: levarage key storage
                ++-> eg: Azure Key Vault

    -> Pin provider version
        ^-!> OBS: provider ==> connector (plugin or driver) between the IaC tool (Terraform) to the specific cloud/SaaS/on-premise service 
        ^-> with the [version control](./src/terraform/terraformSecrets.png), it makes pipeline creation easier, and covers the possible "auto upgrade + break" combo
            +-!> PS: prevent CVEs! it still needs schuleded regular updates for fixes between versions
        
    -> Terraform needs its own dedicated user (least privilege) in a cloud provider
        \-> eg: [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) ==> a role specific for Terraform

> Testing
    -> static analysis (misconfiguration) is the common
        ^-> [tfsec](https://github.com/aquasecurity/tfsec)
            +-> OBS: 2026 - it's transitioning to Trivy

        ^-> [Checkov](https://github.com/bridgecrewio/checkov)

        ^-> [terrascan - deprecated](https://github.com/tenable/terrascan)
            +-> Snyk replaced it