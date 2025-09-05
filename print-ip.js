const os = require('os');

// Fonction pour obtenir l'IP locale
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const details of interfaces[iface]) {
      // On ignore les adresses internes (loopback)
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
}

const ip = getLocalIp();

if (ip) {
  console.log(`\nAccessible sur le réseau : http://${ip}:8080\n`);
} else {
  console.log('Impossible de détecter l\'IP locale.');
}