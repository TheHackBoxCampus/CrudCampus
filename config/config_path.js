export default {
    getPath(url) {
        let path = new URL(url).pathname        
        let name = path.split('/').pop().replace('.js', '')
        return [path, name]
    }
}