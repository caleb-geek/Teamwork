const db = require('../dbconnect');

//Function for creating a new article to the database
exports.createArticle = (req, res) => {
  const {title,article,user_id} = req.body
  const created_on =  new Date()
  db.query('INSERT INTO articles (title,article,created_on,user_id) VALUES ($1, $2, $3, $4)', [title,article,created_on,user_id]).
  then( () => {res.status(201).json({message: 'Article created successfully!' });}).
  catch( (error) => res.status(500).json({error: error }))
  
}

//Function to view articles created on the database
exports.getArticles= (request, response) => {
    db.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Function to view a specific article
exports.getArticleById = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Function for editing an existing or specific article
exports.updateArticle = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, article } = request.body
  
    db.query('UPDATE articles SET title = $1, article = $2 WHERE id = $3',[title, article, id],(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(`User modified with ID: ${id}`)
      }
    )
  }

//Function to delete a specific article on the database
  exports.deleteArticle = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(`Article deleted with ID: ${id}`)
    })
  }

  //Function to comment on article
  exports.commentOnArticle = (req,res) => {
    const article_id = parseInt(req.params.id)
    const {comment,user_id} = req.body
    const created_on = new Date()
    db.query('INSERT INTO comments (comment,created_on,user_id,article_id) VALUES ($1, $2, $3, $4)', [comment,created_on,user_id,article_id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(`Comment posted with ID: ${article_id}`)
      })
  }