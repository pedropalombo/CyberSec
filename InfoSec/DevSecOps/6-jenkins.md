## [Jenkins](https://www.jenkins.io/doc/book/) ##
-> a highly configurable automation tool that's installed onto a given server
    ^-> maleability is achieved through plugins
    ^-> automation and its steps are done via 'jobs'

> Recommendations
    -> ensure it's not publicly available (internet)
        ^-> 'Defence in depth' fundamentals work best here, w/ authentication taking place
            +-> eg: applying Active Directory ([AD](https://plugins.jenkins.io/active-directory/)) for authentication, verifying if said user credentials are found in the [SAML files](https://www.isdecisions.com/en/blog/sso/how-does-saml-sso-work-active-directory), then enabling them to access the platform

    -> plugins/Jenkins are always up-to-date
        ^-!> PS: enable Jenkins to run auto-updates for itself
        ^-!> OBS: also make sure that the Java version Jenkins is using is also up-to-date

    -> set Jenkins service to run as a dedicated least privilige user

    -> enable [CSRF (Cross-Site Request Forgery)](https://www.fortinet.com/br/resources/cyberglossary/csrf) protection via the "Global Configuration" section

    -> disable Jenkins [SSHD server](./src/jenkins/jenkinsCSRF.png) & ensure that the SSH servers are hardened ([CIS benchmarks](./2-orgsAndProjects.md))
        \-> SSHD: SSH Daemon ==> more attack surface == less secure

    -> enable [agent's controller access control](./src/jenkins/jenkinsAgentController.png)
        \-> Jenkins should be configured in an agent-master configuration (jobs running on multiple servers, and not just Jenkins')
            ^-> also known as [Distributed Builds](https://wiki.jenkins.io/display/JENKINS/Distributed+builds)<old> and [Controller Isolation](https://www.jenkins.io/doc/book/security/controller-isolation/)<new>

        \-> configure the access control itself ([authorisation](./src/jenkins/jenkinsAccessController.png))
            ^-> plugin: [Matrix-based security](https://plugins.jenkins.io/matrix-auth/)
                +-!> least privilege always!

    -> secure the [TLS configuration](./src/jenkins/jenkinsTLS.png) for the server
        \-!> OBS: TLS == [Transport Layer Security](https://www.cloudflare.com/pt-br/learning/ssl/transport-layer-security-tls/)

    -> always keep an eye for [Mozilla's recommendation updates](https://docs.tlsref.org/)!

    -> set the [HTTP headers](https://github.com/OWASP/www-project-secure-headers) correctly
        \-!> OBS: these configs may vary according to each project, and the following are more generalistic for the sake of understanding
            +-!> PS: always keep on checking the documentation for updates!

        \-> Strict Transport Security
            ^-> defines the max-age of a platform (browser, app, etc), so there are no portal-downgrade attacks (HTTPS -> HTTP)
                +-> Strict-Transport-Security: max-age=63072000
                    ++-> set as a header to be inserted into the request, w/ the value being in seconds (2 years)
            
        \-> X-Frame-Options
            ^-> prevents clickjacking (disabling hidden layers), impacting i-frame usage as well
                +-> X-Frame-Options: DENY

        \-> X-Content-Type-Options
            ^-> helps to prevent MIME sniffing (making the browser read a file but it's actually a script)
                +-> X-Content-Type-Options: nosniff

        \-> Content-Security-Policy (CSP)
            ^-> helps agains XSS (Cross-site Scripting - script injection)
                +-> Content-Security-Policy: default-src 'self'

        \-> Referrer-Policy
            ^-> enables/disables the referrer, which tracks the source of a request (URI/IRI)
                +-> Referrer-Policy: no-referrer

        \-> Access-Control-Allow-Origin
            ^-> enables/disables the gathering of a resource based on its origin
                +-> Access-Control-Allow-Origin: https://example.com