=| What is WebSec |=
\-> browser security
 (-> Same Origin Policy
  /-> tabs on browser are isolated, and info don't go to one another

\-> Server app security
 (-> attackers can run HTTP code from client and send anything to the server

\-> Client app security
 (-> protect user while using web app locally

\-> Protect user rights
 (-> from social engineering
  /-> eg: 2-factor auth
 (-> from trackers/data leaks

=| URL Basis |=
\-> http://example.com:19/a/b.html?user=Sacarose&year=2024#p2
 (-> Scheme://Hostname:PortNumber/Path?Query#Fragment
  /-> Scheme == Protocol
  /-> Hostname == Domain
  /-> Port Number == which port is the system hosted on the server
  /-> Path == name of the request to the server (used to point to a file on the server)
  /-> Query == for data access
   #-> used on dynamic server endpoints
  /-> Fragment == travel to specific page location