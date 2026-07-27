## [Microservices and Frameworks](/resources/Microservices/microArch.png) ##
> [Application's Microservices](/resources/OSO/microservices.png)
    -> OBS: documentation can be found in oneconf
    -> ASMWrapperService
        \-> authorization
    -> dop-be (backend | legacy)
        \-> all logic flows
    -> dop-fe (frontend | legacy)
    -> downtime / fallout

> K8s / Docker / Helm
    -> used for maintaining/patching the application
    -> connection flow: Docker -> K8s -> Helm
        ^-> Docker
            +-> helps w/ the deployment
                )-> deploys only the minimun data needed, instead of the whole thing
                    ++-> aka containers
        ^-> Kubernetes
            +-> helps w/ the monitoring/orchestration
                )-> the monitoring is done by configuring a form w/ the info/actions/pods to be monitored
        ^-> Helm
            +-> defines the structure to be used by the application
                )-> the organization of config files (YAML), folders, etc