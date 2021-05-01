import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import { CherryPick } from "@ioc:Adonis/Lucid/Model";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column({ serializeAs: null }) // Oculta na resposta
  public authorId: number

  @belongsTo(() => User, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => {
    return value.toFormat('dd/MM/yyyy hh:mm')
  } })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => {
    return value.toFormat('dd/MM/yyyy hh:mm')
  } })
  public updatedAt: DateTime

  // Exibe apenas as informações passadas
  public serialize() {
    return {
      ...this.serializeAttributes(),
      ...this.serializeComputed(),
      ...this.serializeRelations({
        author: {
          fields: ['id', 'email', 'firstName']
        }
      }, false)
    }
  }
}
