## K8s ##
-!> PS: further info on [Kubernetes](https://kubernetes.io/) can be found in the 'Shipyard' branch
-!> PSS: running Kubernetes locally may require [Minikube](https://minikube.sigs.k8s.io/docs/start)

> What is it?
    -> a container orchestration system used for automation of deployments, scalling and management for containerized applications
        ^-> aka: using Docker w/ plenty of containers? Infuse [K8s](./src/k8s/k8sControlPlane.png) to help manage [them](./src/k8s/k8sComponents.png)!

    -> manages pods (container-holders) via [deployments](./src/k8s/k8sDeploymentFlow.png)
        ^-!> deployments are written/configured with YAML files, and define how the pods will be managed together w/ the desired number of replicas
            +-> kubectl apply -f ./nginx-deployment.yaml

            +-> the replicas themselves (pod numbers) are managed by the ReplicaSet, created by the deployment, w/ the ReplicaSet then creating the pods
                ++-!> PS: usually not interacted with

> Testing
    -> testing occours mainly through Deployment's YAML file
        ^-> [Kube-score](https://github.com/zegl/kube-score)
        ^-> [kubesec](https://github.com/controlplaneio/kubesec)

> How to manage a Kubernetes system
    -> can be administered via API, CLI (which sends the commands to the API), or UI (dashboard that makes requests to the API)
        ^-> API
            +-> HTTP API server that can be accessed via REST cals
                ++-!> [client libraries](https://kubernetes.io/docs/reference/using-api/client-libraries/) can be used for said requests

        ^-> CLI == kubectl
            +-> common commands
                ]-> kubectl get
                    ++-> lists resources of a given cluster
                
                ]-> kubectl describe
                    ++-> describes a chosen resource in the cluster

                ]-> kubectl create
                    ++-> creates a new resource ''
                
                ]-> kubectl delete
                    ++-> deletes a resource

                ]-> kubectl logs
                    ++-> displays logs for a container in a pod

        ^-> [UI](./src/k8s/k8sUI.png)
            +-> can be used to make/schedule deployments, down/up pods, and all the other features made possible by the API


> Cloud-based
    -> instead of building the K8s ecosystem from scratch, the same result can be achieved by using cloud services
        ^-> Google Kubernetes Engine - Google - [GKE](https://cloud.google.com/kubernetes-engine)
        ^-> Elastic Kubernetes Service - Amazon - [EKS](https://aws.amazon.com/eks/)
        ^-> Azure Kubernetes Service - Azure - [AKS](https://azure.microsoft.com/en-us/products/kubernetes-service)

    -> can help with managing, patching, and taking care of the cluster

> Recommendations
    -> the 4 layers (4 C's) of [k8s security](./src/k8s/k8sSecurity.png)
        ^-> Cloud (infra)
            +-> keep servers up-to-date
            +-> ensure the [principals](./1-testingAndTooling.md) are done correctly with the respective [tools](./2-orgsAndProjects.md)
        
        ^-> Cluster (k8s config)
            +-> authentication
                ++-> Kubernetes already has native authentication methods, but there are other ways of doing so as well (plugins)
                    ]-> X509 Certificates
                        \\-> used for small group of users
                            #-> cons
                                }-> revocation
                                    =-> hard to revoque a certificate from a specific user w/o impacting all the others
                                }-> long-term certificates
                                    =-> certificates have years-long durations (exploitable)
                    ]-> token-based
                    ]-> OpenID Connect (OIDC)
                    ]-> service accounts
                        \\-> users used only for/by application processes
                    ]-> webhook
                    ]-> authenticating proxy
                
                ++-> also manage users externally, if possible
                    ]-> prevent the access

            +-> RBAC (Rule-based Access Control - authorisation)
                ++-> assigning permissions to rules and then assigning rules to users
                    ]-> [least privilege user access](./src/k8s/k8sClusterRecs.png)
                
                ++-> Namespace
                    ]-> logical grouping of k8s resources 
                        \\-!> PS: good for encapsulation
                        \\-!> OBS: can be done either through the deployment YAML file or the "kubectl create ns <namespace>" command

                ++-> [Role](./src/k8s/k8sRoles.png)
                    ]-> assignable to users and contains the rules applied for said role 

                ++-> [RoleBinding](./src/k8s/k8sRoleBinding.png)
                    ]-> used for assigning roles to the users

            +-> [secrets management](./src/k8s/k8sSecret.png)
                ++-> file containing unencrypted sensitive data (password, token, keys, etc) that needs to be [secured](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
                    ]-> ensure to enable encryption-at-rest, which has natively 3 options
                        \\-> Disabled (default)
                        \\-> Local
                        \\-> KMS (Key Management Service - cloud provider - preferred)
                            #-> [AWS & Azure tools](https://github.com/kubernetes-sigs/aws-encryption-provider | https://github.com/Azure/kubernetes-kms)

            +-> [network policies](./src/k8s/k8sPolicies.png)
                ++-> operates based on IP addresses (port level), restricting traffic of users inside the cluster
                    ]-> if all pods don't need to talk to all pods, then least privilege is needed!
                        \\-> types are multiple, but generally follow the Ingress/Egress logic
                            #-> Ingress: how external users reach services inside the cluster
                            #-> Egress: how internal users access systems outside the cluster
                                }-!> PS: K8s don't have a default outside blocker (DefaultDeny) rule, so one is [needed](./src/k8s/k8sDefaultDeny.png)!
                    
                    ]-!> OBS: never rely on a single rule to rule them all!

        
        ^-> Container (Docker)
            +-> same as in [Docker's recommendations](./4-dockerCommands.md), but implemented differently
                ++-> ensure the image being used is up-to-date
                ++-> use minimal base images (that are up-to-date)
                ++-> implement least privilege (not running the container as root)
                ++-> restrict the [run-time](./src/k8s/k8sContainerRecs.png)
        
        ^-> Code (application)
            +-> ensures it follows [OWASP standard recommendations](./2-orgsAndProjects.md)
                ++-> Top 10
                ++-> ZAP
                ++-> ASVS
                ++-> Cheatsheets
            +-> third-party dependencies are always in check and updated
                ++-> SCA
            +-> run pen tests against it