## Router 2 Router ##
> connect & configure 2 routers to one another in CISCO

> [Goals](/InfoSec/NetSec/CompTIA%20Network+/Module%201/src/proj1_Specs.png)
    \-> configure the IPs
    \-> make sure the routers can ping themselves (x-x, x-y, y-y)
    \-> configure a password for them
        ^-> ... and add encryption to it
    \-> set-up a cryptographied password
    \-> configure the remote access using the TelNet protocol
        ^-> ... and test it
    \-> configure a CLI password + test it


# Steps #
> !! OBS: use tab whenever possible for the commands. saves time and human-memory !!

> Configure the IPs & make sure the can ping-pong
    \-> first choose the routers and connect them (router->router == cross over)
    \-> open each router, and go to its CLI
        ^-> set the name of the the routers
            )-> enable (enables the cofiguration)
            )-> configure terminal (or 'conf t' | enables terminal-level configuration for the device)
            )-> hostname <desired_router_name>
                ]-!> PS: the session name will change accordingly
            )-> exit (leaves the current session)

        ^-> set their IPs so they can connect to one-another
            )-> enable
            )-> show ip interface brief (shows possible IP ports and their statuses)
            )-> conf t (to start the configuration)
            )-> interface gigabitEthernet 0/0/0 (to configure the port [port for the cable to connect the router aka network interface])
                \\-> interface: configuration of a network
                \\-> gigabitEthernet: type of the interface
                \\-> 0/0/0: interface's port/slot format
                    ^#-> slot/subslot/port

            )-> ip address 10.1.1.1 255.255.255.0
                \\-> ip: configuration of the IP
                \\-> address: setting the address that'll be used by the router
                    ^#-> 10.1.1.1: the host's IP (can range from .1 to .254)
                    ^#-> 255.255.255.0: IP mask (users of the same network MUST have the 10.1.1.X IP to share said network [ethernet, etc.])
                        +-> otherwhise it's dealt by the router
            
            )-> no shutdown (starts the router)
            )-> exit
                \\-> and do the same for the other router

> Configure a password + encrypt it!
    \-!> OBS: should come before setting the IPs
    
    \-> get the current active configuration for the device 
        )-> show running-config (or "show run")

    -> setting the password
        ^-> for readable, but extremely crackable, ones
            )-> enable password <password_string>
        
        ^-> for light encryption (hexadecimal <letters + #s>)
            )-> conf t
            )-> service password-encryption
                \\-> service: points to the current active service config
                \\-> password-encryption: encrypts the highest-tier password
        
        ^-> for big-boy encryptions (hash)
            )-> enable secret <password_string>
                \\-> enable secret: sets a password to be secretive (aka use MD5 encryption)
                    +!-> PS: this is set as the main password to be used whenever configured
                    +-> you can type only the password_string set before, and not the encryption

> Configure a remote access for the routers using TelNet
    \-!> PS: TelNet is a protocol that lets you connect to routers remotely w/o being on the same network

    \-> configure the line to be accessed remotely
        )-> en (aka "enable")
        )-> conf t (configure terminal)
        )-> line vty 0 4
            \\-> line: starts the configuration of the line to be used remotely
            \\-> vty: allocates a range of virtual lines (Teletypes) to be connected
            \\-> 0 4: range of of available lines (0, 1, 2, 3, 4 == 5 lines)
        
        )-> login (enables the login for the lines)
        )-> password <password_string> (sets the password to be used between the lines)
            \\-!> OBS: lines are what connect one device/router to another
        
    \-> change to the other router to test the connection
        )-> en
        )-> telnet 10.1.1.2 (connects to the given IP using the telnet protocol)
            \\-!> PS: if the device/router has a password, you'll be prompted to input it

        )-> show run (to make sure you're connected to the right device)
        
        )-> exit (or 'disable' to leave the session)

> Set-up the CLI password
    -> block the user from even being able to enter the terminal (aka 'enable')
        )-> en
        )-> conf t
        )-> line console 0 (start configuration for the given line)
            \\-> line: the current connection you're using (you->router)
            \\-> console 0: the instance of the current console you're using (it's shown on the 'welcome' message)
                +-> '<hostname> conX is now available'
                    ^#-> con == console | X == instance number
        
        )-> login (starts the login/password configuration)
        )-> password <password_string> (sets a password for the console)
    
    -> save the configuration that was done to the flash drive (hdd / ssd / pendrive)
        )-> copy running-config startup-config
            \\-> copy: copies a file to a location
            \\-> running-config: current active configuration for the device/interface (located in the RAM)
            \\-> startup-config: booting configuration that's referenced on start-up (located in the HDD/SSD/generic flash drive)
        
        )-> <'enter'_key>
    
    -> run these for all routers/devices!!