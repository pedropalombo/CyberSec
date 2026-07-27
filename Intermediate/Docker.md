## Docker ##
-> reference video is [here](https://www.youtube.com/watch?v=3c-iBn73dDE)

> [Images](/resources/Docker/dockerImage.png)
    -> package with dependencies and configs
    -> it's a portable artificat
        \-> easily shared

> [Containers](/resources/Docker/dockerContainer.png)
    -> running env for images
        ^-> eg: postgres, redis, mongo, etc.

    -> layers of images that package dependencies & configs inside a repo
        \-> aka 'Docker Hub'

    -> isolates environments with pre-set configs
        \-> easier to install
        \-!> OBS: allows for multiple environments to be run in paralel

    -> [Deployment](/resources/Docker/dockerDeploy.png)

> [Container x HOST ports](/resources/Docker/dockerPorts.png)

> Docker x VMs
    -> VMs
        ^-> virtualizes both 'Applications' and 'OS Kernel' layers
            +-> runs on any OS

    -> Docker
        \-> virtualizes the 'Application' layer
            ^-> smaller images that are faster to run
            ^-> is OS-dependent (based on the version) [W10]
                +-!> PS: 'Docker Toolbox' helps with that

> [Workflow](/resources/Docker/dockerWorkflow.png)
    -> application commits the code to Git
    -> git sends to Jenkins for automation jobs + creates [Docker image](/resources/Docker/dockerImageCreation.png) from [Docker file](/resources/Docker/dockerFile.png)
        \-!> PS: Docker file has to be named 'Dockerfile' for it to work
    -> push the code to Docker repo
    -> application pulls the code from the repo

> Deployment
    -> create a [Docker Compose file](/resources/Docker/dockerDeployCompose.png)
    -> run it w/ 'docker-compose <docker_file> up'

> [Volumes](/resources/Docker/dockerVolumes.png)
    -> persists data
    -> types of persistence (volumes)
        \-> [Host](/resources/Docker/dockerVolumesHost.png)
            ^-> creates a link between the host path to the container's
        \-> [Anonymous](/resources/Docker/dockerVolumesAnonymous.png)
            ^-> let Docker generate the folder
        \-> [Named](/resources/Docker/dockerVolumesNamed.png)
            ^-> let Docker manage the folder, but [you set its reference name](/resources/Docker/dockerVolumesNamedFile.png)

> [Commands]
    -> docker ps -a
        \-> lists all running/stopped containers

    -> docker images
        \-> lists all images
    
    -> docker run -p[port:toBeUsed] <image>
        \-> run the image on chosen port
        \-> docker run ==> create + run a container/image
        \-> docker start ==> runs a container
    
    -> docker exec -it <container_id> /bin/bash
        \-> enter the container's directory
        \-> exit ==> leaves the container
    
    -> [docker-compose <yaml_file> up/down](/resources/Docker/dockerCompose.png)
        \-> runs a config file for network creation/connection/configuration
            ^-!> OBS: no persistence tho
                +-!> PS: needs 'Volumes' for that
    