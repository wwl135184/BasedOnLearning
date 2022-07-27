import { defineStore } from "pinia";

interface UserInfo {
    userName: string | number,
    nickName: string | number,
    token: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userName: 'admin',
        nickName: '管理员',
        token: ''
    }) as UserInfo,
    getters: {
        getToken: (state): string => state.token || ''
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        async login(token: string) {
            try {
                this.setToken(token)
            } catch (error) {
                console.log(error)
            }
        }
    }
})