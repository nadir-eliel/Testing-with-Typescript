import { DataBase } from "../../../app/server_app/data/DataBase"
import { generateRandomId } from '../../../app/server_app/data/IdGenerator'
import * as IdGenerator from '../../../app/server_app/data/IdGenerator'

type someTypeWithId = {
    id: string,
    name: string,
    color: string
}
describe('Database test suite', () => {

    let sut: DataBase<someTypeWithId>
    const fakeId = '12345'
    const someObject1 = { id: '', name: 'obj1', color: 'blue' }
    const someObject2 = { id: '', name: 'obj2', color: 'blue' }


    beforeEach(() => {
        sut = new DataBase<someTypeWithId>()
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId)
    })

    /** We need to overwrite the implementation of generateRandomId function
     * because we cannot know the id in advance
     */
    it('should return Id after insert', async () => {
        const actual = await sut.insert({ id: '' } as any)
        expect(actual).toBe(fakeId)
    })

    it('should get element after insert', async () => {
        const id = await sut.insert(someObject1)
        const actual = await sut.getBy('id', id)
        expect(actual).toBe(someObject1)
    })
    it('should find all elements with the same property', async () => {
        await sut.insert(someObject1)
        await sut.insert(someObject2)
        const expected = [someObject1, someObject2]

        const actual = await sut.findAllBy('color', 'blue')
        expect(actual).toEqual(expected)
    })

    it('should change the color of an object', async () => {
        const id = await sut.insert(someObject1)
        const expectedColor = 'red'

        await sut.update(id, 'color', expectedColor)
        const object = await sut.getBy('id', id)

        expect(object.color).toBe(expectedColor)
    })

    it('should delete object', async () => {
        const id = await sut.insert(someObject1)
        await sut.delete(id)
        const actual = await sut.getBy('id', id)
        expect(actual).toBeUndefined()
        // inserto
        // cuento cuantos tengo
        // borro
        // check: tengo uno menos y la id no existe en la BBDD
    })

    it('should get all elements', async () => {
        await sut.insert(someObject1)
        await sut.insert(someObject2)
        const expected = [someObject1, someObject2]

        const actual = await sut.getAllElements()
        expect(actual).toEqual(expected)
    })
})