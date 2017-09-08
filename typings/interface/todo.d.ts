/**
 * todo types
 */

export namespace todo {

        // todo item
        export interface TodoItem {
            title: string
            completed: boolean
        }

        // fetch status
        export interface FetchStatus {
            status: boolean
        }
    }
