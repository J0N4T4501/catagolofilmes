import { inserirFilme } from '../repository/filmeRepository.js';

import multer from 'multer' 
import { Router } from 'express';

const server = Router();
const upload = multer({ dest: 'storage/capaFilmes' })

server.post('/filme' ,  async(req, resp) =>{
    try{
      const  filmeParaEnserir =  req.body;
    
      const filme = await inserirFilme(filmeParaEnserir);

      
       resp.send(filme)


    }catch(err){
         resp.status(400).send({
             erro:err.message
         });
    }
})

server.put('/filme/:id/imagem', upload.single('capa') ,async (req, resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta  = await alterarImagem(imagem, id);
        if(resposta != 1)
            throw new Error('A imagem não pode ser salva :(' );
        resp.status(204).send();

    }   catch(err){
        resp.status(408).send({
            erro:err.message
        });
    }
})

export default server;


