const fs = require('fs').promises;
class Contenedor {
    constructor(path){
        this.path = path
    }
    async save(Objet){
        try {    
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer)
            let id;
            data.length === 0 ? id = 1 : id = data[data.length-1].id + 1;
            const newProduct = {...Objet, id};
            data.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(data,null,2),'utf-8') 
            return newProduct.id;    
        } catch (error) {
            console.log(error)
        }
    }
    async getById(Number){
        try {    
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer);
            const obj = data.find(obj => obj.id === Number);
            if(!obj) return (null)
            else return (obj);
        } catch (error) {
            console.log(error)
        }
    }
    async getAll(){
        const leer = await fs.readFile(this.path,'utf-8');
        return JSON.parse(leer)
    }
    async deleteById(Number){
        try {    
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer);
            const index = data.findIndex(obj => obj.id === Number)
            if(index !== -1 ){
                data.splice(index,1);
                await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8')
            } else{
                throw new Error('No se encontro ningun producto con esa id')
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile(this.path, JSON.stringify([],null,2), "utf-8")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor