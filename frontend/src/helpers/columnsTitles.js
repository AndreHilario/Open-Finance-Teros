export function fixColumnsTitle(key) {
    if (key === 'name') {
        return 'Nomes'
    } else if (key === 'logoUrl') {
        return 'Logo'
    } else {
        return 'Url de configuração/discovery'
    }
}