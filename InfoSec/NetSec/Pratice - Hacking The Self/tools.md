## Guia Rápido de Ferramentas ##
    -> Varredura
        \-> [nmap](https://www.kali.org/tools/nmap/) [included]
            ^-!> Usage: nmap <flags> <ip>
                #-> eg: nmap -v -A -sV <IP>
                    +-> nmap: command to scan the given IP
                        \\-> default: returns the open ports of the router  
                    +-> -v: verbose mode
                    +-> -A: enabling OS & version detection, script scanning, and tranceroute
                    +-> -sV (system version): version detection (fingerprinting) 

    -> Mapeamento de rede e portas.
        \-> Exploração
            ^-> metasploit

        \-> Framework de exploração (use com cuidado).
            ^-> Ataque Wi-Fi
                +-> aircrack-ng

            ^-> Testes de segurança Wi-Fi.
                +-> MitM / Sniffing
                    \\-> bettercap

            ^-> Ataque ARP spoofing e monitoramento.
                +-> Análise de Tráfego
                    \\-> wireshark

            ^-> Inspeção profunda de pacotes.
                +-> Força Bruta
                    \\-> hydra

            ^-> Teste de senhas em serviços (SSH, FTP, etc).
                +-> IDS/IPS
                    \\-> suricata

            ^-> Detecção de intrusão em tempo real.
                +-> Escaneamento de Vulnerabilidades
                    \\-> nikto

            ^-> Web server scanner.
                +-> Secrets Scanning
                    \\-> truffleHog