## Pipelines ##
-> automated workflows for builds/testing/deployments based on YAML files
    \-!> PS: better to use YAML files, than built-in 'tasks', for their configurability 

> Stages
    -> contains 'jobs' that define the workflow of the pipeline and 'runners' that run the jobs
        ^-!> 'jobs' are divided into:
            +-!> OBS: jobs are defined like methods/functions, and can run in parallel of others in the same 'stage'
            +-> Stage
                ++-> defines the scope of when it'll trigger
            +-> Script
                ++-> what said job will execute