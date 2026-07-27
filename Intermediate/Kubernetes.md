## Kubernetes ##
-> [source video](https://www.youtube.com/watch?v=X48VuDVv0do)

-> an [orchestration tool](/resources/K8s/k8sIntro.png) for managing containers in different environments

> [Features](/resources/K8s/k8sFeatures.png)

> [Components](/resources/K8s/k8sComponents.png)
    -> has many components, but not all are needed

> [Pods & Nodes](/resources/K8s/k8sPods_Nodes.png)
    -> [Pods](/resources/K8s/k8sPods.png)
        \-> 1+ containers
            ^-> same network
                +-> IP address & port space
            ^-> same storage volumes
            ^-> have a single purpose
        \-> on crash, a new IP address is associated with said pod
            ^-!> that's what 'Services' are for!
    
    -> [Service](/resources/K8s/k8sService.png)
        \-> permanent IP address + load balancing
            ^-> uses ['Ingress'](/resources/K8s/k8sIngress.png) to route the path for the 'Services'
                +-> manages/redirects external access to services inside a cluster based on rules
                    ]-> [URLs, domains, etc.](/resources/K8s/k8sServiceIngress.png)

        \-> types of services
            ^-> ClusterIP
                +-> also known as 'Internal Service'
                +-!> OBS: if not specificated during config, it sets as this
            
            ^-> [Headless](/resources/K8s/k8sServiceHeadless.png)
                +-> a service that points to a specific 'Pod'
                +-> itself doesn't have an IP address

        \-> attributes
            ^-> ClusterIP
                ^-> default | internal service
                    +-> only accessible inside the cluster

            ^-> [NodePort](/resources/K8s/k8sServiceNodePort.png)
                ^-> accessible for external traffic
                    +-> not secure

            ^-> [LoadBalancer](/resources/K8s/k8sServiceLoadBalancer.png)
                ^-> becomes accessible externally through cloud's LoadBalancer
                    +-> the LoadBalancer points to the NodePort, to them communicate with the cluster

    -> Nodes
        \-> physical/virtual machines that runs the pods
            ^-> also provide the resources for them to run
                +-> compute
                +-> network
                +-> storage
            ^-> can also act as a replica of another node [in case the main crashes](/resources/K8s/k8sCrash.png)
                +-> replicas can be created through 'blueprints' for 'Pods'
                    ]-> aka 'Deployment'
        
        \-> [components](/resources/K8s/k8sComponetsGraph.png)
            ^-> Kubelets
                +-> asures that the pods are running as expected
            ^-> Container runtime
                +-> runs containers
                    ]-> Dockers, Containerd, etc.
            ^-> Kube-proxy
                +-> manages the networking for Pods

> ConfigMap & Secret
    -> [ConfigMap](/resources/K8s/k8sConfigMap.png)
        \-> helps updating and centralizing the configuration of a pod
            ^-> no need to rebuild images
            ^-!> OBS: no credentials allowed inside!
                +-!> PS: that's what 'Secret' is for ;)
    
    -> [Secret](/resources/K8s/k8sSecret.png)
        \-> stores secretive data for configuration purposes
            ^-> base64 encoded
            ^-!> PS: not enabled by default

> [Volumes](/resources/K8s/k8sVolumes.png)
    -> used for data persistence
        ^-> as shown in [Docker](/Intermediate/Docker.md)
    -!> OBS: [cluster](/resources/K8s/k8sCluster.png) == K8s' infrasctructure

> [Deployment](/resources/K8s/k8sDeployment.png)
    -> an abstraction of 'Pods'
        \-> used for replicating the 'Pods' through blueprints
            ^-!> OBS: DBs can't be replicated through 'Deployments'
                +-!> PS: that's done through ['StatefulSet'](/resources/K8s/k8sDBs.png) ;)
                    ]-!> PSS: it ain't easy to deploy it tho
                    ]-> 'Deployment' for stateLESS apps
                    ]-> 'StatefulSet' for stateFUL apps/dbs
                +-!> OBS: DBs are often hosted outside a cluster

> [Architecture](/resources/K8s/k8sArchitecture.png)
    -> Nodes
    -> [Masters processes](/resources/K8s/k8sMasterCreation.png)
        \-> [API Server](/resources/K8s/k8sAPI.png)
            ^-> cluster gateway
            ^-> gatekeeps the authentication

        \-> [Scheduler](/resources/K8s/k8sScheduler.png)
            ^-> creates and assigns where the new needed pod goes
                +-!> PS: who starts the pod is the 'Kubelet'
                +-> always chooses the least busy node
        
        \-> [Controller Manager](/resources/K8s/k8sControllerManager.png)
            ^-> detects state change for pods/clusters
                +-> if a pod crashes, it's detected by 'Controller Manager', sets for re-initialization by the 'Scheduler', and is re-started by the 'Kubelet'

        \-> [etcd](/resources/K8s/k8sETCD.png)
            ^-> basically the cluster's brain
                +-> any changes get stored in the key-value store
                    ]-!> OBS: doesn't store any app data, just the state changes from the components

> [Production Clusters](/resources/K8s/k8sProductionCluster.png)
    -> [Test / Local Cluster Setup](/resources/K8s/k8sCommands.png)
        \-> done through ['minikube'](/resources/K8s/k8sMinikube.png)
            ^-> used for testing nodes by creating a virtual environment (separated cluster) to isolate the node's process
                +-!> PS: since it creates a VE, virtualization needs to be enabled
                +-> the communication inside the cluster is done by ['Kubectl'](/resources/K8s/k8sKubectl.png)
                    ]-!> OBS: not limited to just 'Minikube'
                    ]-> it's a [command line tool for clusters](/resources/K8s/k8sCLI.png)
    
    -> [Configuration Files](/resources/K8s/k8sConfigComparision.png)
        \-> devided into 3 parts (all YAML)
            ^-> metadata
                +-> kind of structure
                    ]-> service, deployment, etc.

            ^-> specification
                +-> what's needed by the structure
                    ]-> amount of replicas, selectors, ports, [templates](/resources/K8s/k8sTemplate.png), etc.

            ^-> status
                +-> differentiates the 'Desired' and 'Actual' state for a 'Deployment'
                    ]-!> OBS: it's automatically generated/managed by K8s
                    ]-> compares the current data w/ the model's, and change the cluster accordingly
                        )-> data comes from 'Etcd'
            
        \-> [good practices](/resources/K8s/k8sConfigFile.png)
            ^-> store the config file w/ the code/GIT repo
            ^-> human-friendly data serialization (nomenclature)
            ^-> !!! IDENT IT PROPERLY !!!

    -> [Connecting Deployment to Pods]
        \-> it happens through the selectors of ['Deployment'](/resources/K8s/k8sConnectingPods.png) and ['Service'](/resources/K8s/k8sConnectingService.png)

> [Namespaces](/resources/K8s/k8sNamespaces.png)
    -> a virtual cluster for resources
        \-> [4 default 'Namespaces'](/resources/K8s/k8sNamespacesDefault.png)
            ^-!> OBS: new 'Namespaces' can be created
                +-> naming can be applied to multiple namespaces using 'Kubens'
            
            ^-> default
                +-> resources created by the user
            
            ^-> kube-system
                +-> system / Master + Kubectl processes 
                +-> !!! shouldn't be modified !!!

            ^-> kube-public
                +-> ConfigMap with the cluster's info

            ^-> kube-node-lease
                +-> "heartbeats" for nodes
                    ]-> determines the availability of a node

            ^-> kubernetes-dashboard
                +-> <only> for 'Minikube'
    
    -> why even use it?
        \-> so it's easier to monitor the resources
            ^-> [dur](/resources/K8s/k8sNamespacesReason.png)
                +-!> OBS: it's not recommended if the project is small

> Helm
    -> K8s package manager (for public & private usage)

    -> [Helm Charts](/resources/K8s/k8sHelmCharts.png)
        \-> bundle of YAML (config) files
            ^-!> PS: can be pushed to a Helm repo (Helm Hub) for re-usage
        
        \-> also acts as a ['Templating Engine'](/resources/K8s/k8sHelmTemplating.png)
            ^-> allows for config files to share attributes [configurations](/resources/K8s/k8sHelmStructure.png) by design
                +-> makes CI/CD testing more practical 
            
            ^-> [value files](/resources/K8s/k8sHelmTemplatingValues.png) can be created to make use of the templates
    
        \-> helps with managing the [releases](/resources/K8s/k8sTiller.png)
            ^-> uses ['Tiller'](/resources/K8s/k8sReleaseTiller.png)
                +-> rollbacks can be done, since copies are created before the release
                +-!> OBS: 'Tiller' has been removed since 'Helm 3'
                    ]-> it had too much access, making it a security risk

> Volumes
    -> same idea as in [Docker's Volume](/Intermediate/Docker.md)

    -> [types of persistence](/resources/K8s/k8sVolumesShort.png)
        \-> [Persistent Volume (PV)](/resources/K8s/k8sVolumesPersistent.png)
            ^-> the storage in the cluster ("disc space")
                +-> eg: 10GB on AWS EBS

        \-> Persistent Volume Claim (PVC)
            ^-> a request for storage from a user or 'Pod'
                +-> 'Claims' bind to 'Volumes' that meet their required request 

        \-> Storage Class
            ^-> template that defines how to dynamically create 'Volumes'
                +-> automates PV creation when a PVC is made
                    ]-> eg: SSD, HDD, AWS, NFS, etc.

    -> requirements
        \-> storage must be available on all nodes
        \-> not dependent on 'Pod' lifecycle
        \-> if cluster crashes, the DB should prevail
