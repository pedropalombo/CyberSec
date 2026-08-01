# Cyber Security

This repository is a practical collection of code snippets, exercises, and reference notes aimed at helping me to explore security concepts.

## What you’ll find here

The materials are organized as small, runnable examples and short reference modules. The goal is to keep things concise and approachable so it's easier to explore key security topics without getting overwhelmed.

### Web Security Topics

- **Secure development practices** (input validation, error handling, defensive patterns)
- **Authentication & authorization** (session handling, access control, token strategies)
- **Data protection** (encryption, hashing, secret management)
- **Common web threats** (XSS, injection, CSRF, and mitigation techniques)

### Networking Topics

- **Networking basics** (topology ideas and common hardware components)
- **TCP/IP fundamentals** (protocol stack, addressing, and packet structure)
- **Subnetting & CIDR** (IP planning, masks, and network segmentation)
- **Routing & switching** (OSI model mapping, routing protocols overview)
- **Network services** (DNS, DHCP, and common service hardening)
- **VLANs & segmentation** (isolation strategies and micro-segmentation)
- **Firewalls & access control** (packet filtering, stateful inspection, ACLs)
- **Intrusion Detection & Prevention** (IDS/IPS basics and placement)
- **VPNs and secure tunnelling** (IPSec, TLS-based VPNs, secure remote access)
- **Packet capture & analysis** (Wireshark examples and practical exercises)
- **Network hardening & monitoring** (logging, flow analysis, and alerting)

### DevSecOps Topics

- **Foundations & theory** (security design principles, threat modeling, risk assessment)
- **Shift-left security practices** (embed security earlier in development with design review and threat modeling)
- **Secure CI/CD pipelines** (hardening runners, signing artifacts, least privilege — conceptual guidance and applied examples)
- **Infrastructure-as-Code security** (Terraform/HCL security patterns, policy-as-code rationale, and drift detection examples)
- **Container and image security** (theory of image provenance and supply-chain risks, plus scanning and runtime hardening practices)
- **Secrets management** (principles of secret lifecycles and vaulting, with pipeline integration examples)
- **Automated testing: SAST/DAST/IAST** (when and why to use each approach, and how to integrate them practically)
- **Dependency & supply chain security** (risk models, SBOMs, dependency scanning, and mitigation strategies)
- **Policy-as-code & enforcement** (theory behind policy-driven controls (OPA) and example gate checks)
- **Runtime security & observability** (concepts for detection and response, with logging/tracing examples)

## How to use this repository

### Navigate the materials

- In exercise folders, `src/` typically contains the prompt and `self/` contains a worked solution.
- Reference documents and diagrams are provided as markdown and image files alongside code.
- Look in the folder for the topic you want to explore (for example, [InfoSec/NetSec/](InfoSec/NetSec/) for networking labs or [DevSecOps/](InfoSec/DevSecOps/) for both theoretical foundations and hands-on examples for CI/CD and IaC).

## Project structure (high level)

- **[InfoSec/WebSec - Oxford [CS253]/](InfoSec/WebSec%20-%20Oxford%20%5BCS253%5D/)** — **course-style exercises and class notes** focused on web security.
- **[InfoSec/NetSec/](InfoSec/NetSec/)** — **networking concepts and reference diagrams** (topology, packet capture labs, IDS/IPS notes, VPN and segmentation examples).
- **[DevSecOps/](InfoSec/DevSecOps/)** — **theoretical foundations and practical examples** for securing development pipelines and infrastructure (security principles, CI/CD examples, IaC security checks, container hardening and related exercises).
