## Docker ##
-!> PS: further info on [Docker](https://www.docker.com/) can be found in the 'Shipyard' branch

> What's Docker anyways?
    -> simply put, it's a way to [containerize](./src/docker/dockerOverview.png) an application
        \-> server-wise, without Docker, each app hosted in the server would need their own [VM and OS](./src/docker/dockerVM.png), needing much more infrastructure to keep it running stably
            ^-> with Docker, Docker Engine acts as the 'Hypervisor' (VM Monitor), talking directly to the kernel, applying the host's OS to all of the applications inside of it, but still encapisulating each app on their own container (individuality w/ no outside impact), making the whole system light-weight
                +-!> OBS: the configuration for said containers are in the Dockerfile
                +-!> PS: the containers themselves don't run locally, but rather in Docker registries (hosted)
                    \\-> types of Docker registries
                        ++-!> PS: most deprecated ones were sent to their respective companies and are integrated using [Docker Scout](https://docs.docker.com/scout/)

                        ++-> Registry (self hosted - Deprecated)
                            ]-!> OBS: it's now [CNCF's](https://github.com/distribution/distribution)

                        ++-> [Docker Hub](https://hub.docker.com/)
                        ++-> [GitLab](https://docs.gitlab.com/user/packages/container_registry/)

                        ++-> [GitHub](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

                        ++-> [Azure - Deprecated](https://azure.microsoft.com/en-us/products/container-registry/)

                        ++-> AWS (ECR - Deprecated)[https://aws.amazon.com/ecr/]

    -> it's quick to deploy since it requires no outside dependencies, as well as easy to rollback as everything is versioned via tags
        \-!> OBS: [Kubernetes](./7-kubernetes.md) orchestrate the containers to be moved and used elsewhere if needed!

    -> what it isn't
        \-> a substitute for a VM
            +-> rather, it replaces the need of using a VM for only one purpose
                \\-> eg: [running a web server](./src/docker/dockerVM.png)

    -> recommendations:
        \-> using minimalistic base images
            +-> keeping it light-weight, and trimming possible attack surfaces (usually coming from bloats)
        
        \-> least privilege as always
            +-> Docker containers run as 'root' by default if there are no specified user
                ++-> setting a group and their users with [minimal-access](./src/docker/dockerUserPrivileges.png) is essential

            +-> limit runtime options through [flags](https://docs.docker.com/engine/containers/run/)
                ++-> --memory
                    ^-> accessable memory (kb, mb, gb)

                ++-> --cpus
                    ^-> available CPU resources that can be used

                ++-> --read-only
                    ^-> mounts the root file system to be read-only

                ++-> --restart
                    ^-> sets the restart policy (default: 5 tries)

                ++-> --security-opt="no-new-privileges:true"
                    ^-> restricts any additional privileges to be obtained by the container


        \-> using .dockerignore
            +-> setting one to avoid accidental COPY commands from running and exposing sensitive data

        \-> use fixed tags for versioning/immutability
            +-> if not set, the :latest will be used and past versions of images can be lost, or outside changes may not be noticed
                ++-> eg: example:latest vs example:2.0.1-alpine vs example:2.0.1-ubuntu

        \-> never use ADD, use COPY
            +-> both copy files, but...
                ^-> ADD
                    ++-> will create the location (if non-existent)
                    ++-> accepts archives
                    ++-> supports local URLs for source (downloads into the destination dir)
                        \\-> enables for [Zip-bombs](https://github.com/iamtraction/ZOD | https://www.huntress.com/cybersecurity-101/topic/what-is-zip-bomb)
                        \\-> also enables Man-in-the-Middle attacks
                            ]-> can change the URL in the middle of the addition, enabling the attack
                
                ^-> COPY
                    ++-> needs defined location
                    ++-> separates the archive to be extracted into different layers (good for caching)
            

> [Dockerfile](https://docs.docker.com/reference/dockerfile)
    -> the [code section](./src/docker/dockerFile.png) of a container, generating a Docker image (stored in the Docker repositories) that's used by the container (Virtualized Runtime Environment) for it to run
        \-!> OBS: the code inside the Dockerfile is OS-based, so to know which OS is running on the given container is important!

    -> Testing
        ^-> checking if the Dockerfile is secure
            +-> first using a [linter](https://owasp.org/www-project-devsecops-guideline/latest/01b-Linting-Code)
                ++-> [Hadolint](https://github.com/hadolint/hadolint)
                    \\-!> OBS: if an error is thrown, check its Wiki section!

                ++-> [Dockle](https://github.com/goodwithtech/dockle)
            
            +-> then checking for vulnerabilities on its base image
                ++-> [Trivy](https://github.com/aquasecurity/trivy)
                ++-> [Snyk](https://snyk.io/)
            
            +-> and finish by referencing CIS benchmarks for Docker, so we can harden it!
                ++-> [docker-bench-security](https://github.com/docker/docker-bench-security)
                ++-> [Dockerscan](https://github.com/cr0hn/dockerscan)


> [Docker-compose](https://github.com/docker/compose)
    -!> PS: needs to be installed first

    -> defines & runs multi-container applications via a single YAML file
        ^-> simplifies everything since we can just point to a single file to run the needed commands
            +-> docker-compose up/down 
                \\-> ups/downs everything inside local dir docker-compose file


> [Commands](https://docs.docker.com/get-started/docker_cheatsheet.pdf | https://docs.docker.com/reference/cli/docker/)
    -!> PS: these won't cover [Helm's](https://helm.sh/docs/) (Alpine) nor [K8's](https://kubernetes.io/docs/reference/kubectl/quick-reference/), just Docker's

    -> docker build (deprecated)
        ^-> builds the application based on a given template
            +-> OLD ==> docker build -t <application> .
            +-> NEW ==> docker buildx build -t <application> .
                ++-!> needs docker-buildx to be installed

    -> docker pull
        ^-> pulling a given image from a registry
            +-> docker pull nginx
    
    -> docker images
        ^-> listing all the images
            ^-> docker images

    -> docker run
        ^-> running a container
            +-> docker run --name nginx-docker -v /content:/usr/share/nginx/html:ro nginx
                ++-> runs a container (nginx), based on nginx's Dockerhub [default] container (nginx-docker), by mounting it into a directory (-v) and setting it as read-only (:ro)

    -> docker login
        ^-> trigerring authentication for the session
        ^-> docker login <docker.server.com>

    -> docker ps
        ^-> lists all running containers
            +-> docker ps -a
                ++-> -a ==> lists stopped and running containers (all)

    -> docker kill
        ^-> forcely stops the running process of a given container
            +-> docker kill ffc8509744d

    -> docker rm
        ^-> removes the container from the machine
            +-> docker rm ffc8509744d