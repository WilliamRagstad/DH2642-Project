export function insureCrypto() {
    if (!window.crypto.subtle) insureHTTPS();
}

export function insureHTTPS() {
    if (!window.location.host.includes('localhost')) window.location.replace(window.location.href.replace('http:', 'https:'))
}