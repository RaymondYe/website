const util = require('../util')
const { tags } = require('../services')

module.exports = {
    /**
     * add tags
     */
    add: async (ctx, next) => {
        let { body = {} } = ctx.request
        let { name } = body
        try{
            util.isNotEmpty({ name })
            let insertResult = await tags.add(name, ctx)
            if(insertResult.affectedRows) {
                ctx.sendJson({
                    id: insertResult.insertId
                })
            }else {
                throw new Error("Insert failed!!!")
            }
        }catch(error) {
            ctx.sendError(error.message, error.status || 400)
        }
    },
    /**
     * delete tags
     */
    delete: async (ctx, next) => {
        let { id } = ctx.params
        try{
            util.isInt(id)
            let deleteResult = await tags.delete(id, ctx)
            if(deleteResult.affectedRows) {
                ctx.sendJson({
                    id
                })
            }else {
                throw new Error("Delete failed!!!")
            }
        }catch(error) {
            ctx.sendError(error.message, error.status || 400)
        }
    }
}