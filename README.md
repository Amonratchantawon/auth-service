**Routes**

  

- [POST] "/api/auth/signup"

    	Input {
			   username:String,
			   password:String,
			   firstName:String,
			   lastName:String,
			   email:String               
    	}

    	Output {
			   status:Number,
			   token:String 
    	}

  

- [POST] "/api/auth/signin"

    	Input {
			   username:String,
			   password:String         
    	}

    	Output {
			   status:Number,
			   token:String 
    	}

- [GET] "/api/getuser"

    	Output {
			   status:Number,
			   data:User 
    	}
