# Mb-Desafio
# Sobre
Api de um sistema de ingressos, criada usando mongo db e express. Permite a criação/Login de usuários, CRUD de eventos e a sua compra



## Registro e Login de Usuário

**Registrar**
	

    
    Request:
	    POST URL/api/auth/register
	    Body JSON {name, password role:opcional -> default user}
    
    Response:
	    JSON {token:jwt Token}


**Login**
  

  

      Request:
            POST URL/api/auth/login
            Body JSON {name, password}
        
    Response:
	    JSON {nome, eventos[], jwt:JWT_Token}


## Eventos


**Criar**
	Exclusivo para usuários com  role: empresa
	
    Headers:
	    Authorization: Bearer JWT_TOKEN
    Request:
	    POST URL/api/eventos
	    Body JSON {name, data, preco, info:Opcional}
    
    Response:
	    JSON {msg: Criado}


**Editar**
	Exclusivo para o criador do evento
	
    Headers:
	    Authorization: Bearer JWT_TOKEN
    Request:
	    PATCH URL/api/eventos
	    Body JSON {name:Opcional, data:Opcional, preco:Opcional, info:Opcional}
    
    Response:
	    JSON {evento}


**Deletar**
	Exclusivo para o criador do evento
	
    Headers:
	    Authorization: Bearer JWT_TOKEN
    Request:
	    POST URL/api/eventos?name=Nome_do_Evento
    
    Response:
	    JSON {msg: Evento deletado}
	   

**Buscar**

    Request:
	    POST URL/api/eventos?name=Nome_do_Evento
	    Body JSON {name:Opcional, data:Opcional, preco:Opcional, info:Opcional}
    
    Response:
	    JSON {eventos}



## Comprar e Eventos Comprados
**Comprar**
	
    Headers:
	    Authorization: Bearer JWT_TOKEN
    Request:
	    POST URL/api/user
	    Body JSON {name:Nome do Evento}
	    
    
    Response:
	    JSON {link: Link para o pagamento}


**Eventos comprados pelo Usuário**
	
    Headers:
	    Authorization: Bearer JWT_TOKEN
    Request:
	    GET URL/api/user
	    
    
    Response:
	    JSON {id, eventos:[eventos comprados]}
	    
	   
	    
	   
