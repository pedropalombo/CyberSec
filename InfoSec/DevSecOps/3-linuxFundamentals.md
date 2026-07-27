## Linux Security Fundamentals ##
> File Permission & Ownership
    -> so we can respect the principle of [least-privilege](./src/linuxPermissionSymbols.png), we need to make sure the [right users](./src/linuxPermissionOwners.png) have [access/control](./src/linuxPermissionValue.png) over certain files/dirs is essential
        \-!> PS: reference for [CHMOD](https://linux.die.net/man/1/chmod) and [CHOWN](https://linux.die.net/man/1/chown)
        \-!> OBS>: testing can be done with the [hands-on files](./src/handsOn/)
        
        ^-> eg: 
            +-> CHMOD (change mode): chmod <valuesForPrivileges> <file>
                ++-> chmod 700 permissionTest-ownerReadWriteExecute.txt

            +-> CHOWN (change owner): chown <owner>:<group> <file>
                ++-> chown root:root permissionTest-rootOwned.txt
                    \\-!> OBS: group information can be found in [/etc/group](https://linux.die.net/man/5/group)


> Password Storage
    -> there's a file that usually contains user account info such as userId, password, home directory, shell in-use, and so on
        \-> [Older distributions](https://man7.org/linux/man-pages/man1/passwd.1.html)
            ^-> found in [/etc/passwd](./src/linuxPassword.png), but changed to ':x:'
        
        \-> [Newer/Current ''](https://linux.die.net/man/5/shadow)
            ^-> passwords are now stored in [/etc/shadow](./src/linuxPasswordShadow.png), or 'shadow files', but the user info is still in /etc/passwd
                +-> dissection of the format used by the shadow file
                    ++-> linuxuser: $6$wXtY9ZoG$MzaxvKfj3Z8F9G8wKz7LU0...: 18009 : 0: 120 : 7 : 14 ::
                        ]-> Base ==> user : encryptedPasswordValue($id$salt$hash) : dateSinceModified : minPswrdAge : maxPswrdAge : pswrdWarningPeriod : pswrdInactivityPeriod
                        
                        ]-> $6$ ==> encryption algorythm
                            *-!> PS: PAM (/etc/pam.d/common-password) can be used to determine the [chosen algorythm](./src/linuxPasswordPAM.png)
                                \\-> $1$ == MD5
                                \\-> $2a$ == Blowfish
                                \\-> $2y$ == Blowfish
                                \\-> $5$ == SHA-256
                                \\-> $6$ == SHA-512
                                \\-> $y$ == yescrypt
                        
                        ]-> wXtY9ZoG ==> Salt
                            \\-> ensures that even with 2 users having the same hash, they'll differ based on this seasoning of the password (Rainbow Table Attacks)
                        
                        ]-> MzaxvKfj3Z8F9G8wKz7LU0... ==> encrypted password value
                            \\-> (salt + password) * encryption == encryptedPasswordValue


> [Sudo (Super User Do)](https://linux.die.net/man/8/sudo)
    -> allows users to escalate privileges, but still mantains accountability (unlike 'root')
        ^-!> OBS: "least privilege" applies heavily here!
        ^-> root: shares passwords, lacks logging (accountability), yet it gives full access to the user
            +-!> OBS: you can change to the root user with "sudo su root"

    -> define who can evoke sudo on [/etc/sudoers](./src/linuxSudo.png)
        ^-!> PS: edit it using 'visudo', since said text editor uses syntax validation before saving
        
        ^-> eg: sudo usermod -aG sudo <username>
            +-> aG ==> {a}ppend to {G}roup
                \\-> lamer's terms: run the user modification command, appending to the "sudo" group the user <username>


> Apt / apt-get
    -> used for package management
        ^-> eg: installing software
            +-> Apt ==> manual usage
            +-> apt-get ==> scripting / Dockerfiles
        
        ^-> other managers are
            +-> Yum (RedHat)
            +-> Apk (Alpine [Docker])
    
    -> a few of the most used commands
        ^-> apt-get update
            +-> update sources list
                \\-> Pop!_OS ==> /etc/apt/sources.list.d/system.sources

        ^-> '' upgrade
            +-> upgrade all installed packaged based on the 'sources' list

        ^-> '' dist-upgrade
            +-> upgrade dependencies of packages
                \\-!> PS: not recomended for day-to-day updates since it can break programs that don't share said updated dependencies

        ^-> '' install
            +-> install specific package

        ^-> '' remove
            +-> remove individual specific package

        ^-> '' autoremove
            +-> removes specific package && its dependency packages

        ^-> '' autoclean
            +-> cleans cache & file space


> [Automatic updates](https://help.ubuntu.com/community/AutomaticSecurityUpdates)
    -> scheduled updates/upgrades
        ^-!> OBS: should be enabled if supported!


> [SSH (Secure SHell)](https://linux.die.net/man/1/ssh)
    -> enables remote login to the CLI of a server
        ^-!> PS: usually a [client-server model](./src/linuxSSH.png)
            +-> [eg](./src/linuxSSH-example.png): client ==> Putty (Windows) || server OpenSSH (Linux)
                \\-> server creates a daemon (service) that accepts remote connections, and the client connects to it

    -> runs on TCP port 22 by default
        ^-!> this can be changed to reduce noise in logs, but it won't increase security
    
    -> supports:
        ^-> Forwarding
            +-> connecting to a server/machine via a different server/bastion-host/jump-box that encrypts the connection before sending it over to the destination
                ++-!> OBS: it's the configuration behind it all
                ++-> eg: machine 1 (insecure connection [HTTP]) => bastion-host (highly hardened server [encrypts the connection]) => server 2

        ^-> Tunneling
            +-> port-forwarding for connecting a client machine to a server machine (or vice-versa)
                ++-!> OBS: the encrypted channel used for the connection

    -> also used in/for:
        ^-> adding encryption of legacy applications
            +-> STFP & SCP protocols

    -> Securing the SSH
        ^-> ensure that SSHv2 is in use (protocol 2)
        ^-> public keys ([ED25519](https://ed25519.com/)) >>>> passwords
        ^-> enable MFA
        ^-> restrict the default port (22) for specific IP addresses
            +-> ... as well as other servers as per [Mozilla recommendations](https://infosec.mozilla.org/guidelines/openssh)
                \\-> KexAlgorithms
                \\-> MACs
                \\-> Ciphers
                
        ^-> disable root login from SSH (PermitRootLogin No)
        ^-> make sure there's bruteforce protection (fail2ban, denyhosts, etc)
            +-> [fail2ban](https://github.com/fail2ban/fail2ban)
            +-> [denyhosts](https://denyhosts.sourceforge.net/)
        
        ^-!> Always check Mozilla recommendations!