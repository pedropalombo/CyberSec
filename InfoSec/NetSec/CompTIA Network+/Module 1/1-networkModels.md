## Network Models ##

> [OSI (Open System Interconnection)](./src/Network/OSI%20Model/osiOverview.png)
    ->> [EX](./src/Network/OSI%20Model/osiOverviewExample.png): I'll send a file from my PC using via the internet through the HTTP protocol together with the NFS protocol, and this transportation will be secured by the TCP protocol, aggregated via the IP protocol, and finally sequenced with the Ethernet protocol. All of this being sent using a Fibre cable.

    -> made for connecting different network types together
        \-> frameworks that assures software-hardware [compatibility inside the network system](./src/Network/OSI%20Model/osiModel.png)
            ^-> network functionalities/protocols described/set-up in [7 layers](./src/Network/OSI%20Model/osiLayers.png)
                ^^!-> PS: let's use the [telemarketing company of an internet provider](./src/Network/OSI%20Model/osiTechnicianExample.png)

                >>>> Computer Networks <<<<
                §=> protocol-heavy, and highly automated

                #-> [Physical](./src/Network/OSI%20Model/layerPhysical.png)
                    +-> provides electrical/mechanical connections to/for the network
                        ++-> "Please secure that everything is connected accordingly to your modem/router"
                            )-> eg: cables, network boards, HUBs, etc (connectors and hardware in general)

                #-> [Data/Enlace](./src/Network/OSI%20Model/layersData.png)
                    +-> ensures error recoveries, influx control, and data/frame sequencing
                        ++-> "Check the configuration of the switch to see if it's as standard"
                            )-> eg: [Ethernet](2-ethernetStructure.md/#ethernet-structure), Token Ring, Switches (MAC tables) (hardware's software-focus)

                #-> [Network](./src/Network/OSI%20Model/layersNetwork.png)
                    +-> combines messages/segments into packages, as well as define the protocols for routing (IP, IPx, etcS)
                        ++-> "Please turn the router off, wait for a few seconds, and turn it back on for the changes I've made to take place"
                        )-> eg: Routers

                #-> [Transport](./src/Network/OSI%20Model/layersTransport.png)
                    +-> secures that the data/packages's integrity is not lost between source & target (end-2-end), and reorganizes the segments (packages), taking care of the data influx ([UDP, TCP protocols](./src/Network/OSI%20Model/layersTransportProtocols.png))
                        ^^-> UDP == User Datagram Protocol == speed, but w/ possible package loss
                            )-> eg: VoIP ('Voice over IP'), video, gaming, DNS

                        ^^-> TCP == Transmission Control Protocol == "slower", but safer/more stable (handshakes, ACKs, etc)
                            )-> eg: web usage, file transfering, emails, SSHs


                >>>> Computer Devices <<<<
                §=> user-oriented, computer-based

                #-> Session
                    +-> stablish, manage and end sessions/connections based on the user's requests
                        ++-> "I'll check the system to see if there's any blockage for your account"
                            )-> [NFS (Network File System), SQLs](./src/Network/OSI%20Model/layersSession.png)

                #-> [Presentation](./src/Network/OSI%20Model/layersPresentation.png)
                    +-> accepts & structures the messages to be presented to the application (compression, encryption of data)
                        )-> eg: ASCII, JPEG, ZIP

                #-> [Application](./src/Network/OSI%20Model/layersApplication.png)
                    +-> anything that's displayed for the user to interact with (protocols: HTTP, FTP, SMTP)
                        )-> eg: web browsers, emails, etc

