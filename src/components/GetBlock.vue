<template>
    <section class="get" id="users">
        <div class="container">
            <ui-heading>Working with GET request</ui-heading>
            <users-component :users="sortedUsers"></users-component>
            <my-preloader v-if="preloader"></my-preloader>
            <ui-button 
                v-if="next_url"
                type="button"
                @click="loadUsers">Show more</ui-button>
        </div>
    </section> 
</template>

<script>
import MyPreloader from './UI/MyPreloader.vue'
import UsersComponent from './UsersComponent.vue'

const GET_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'

export default {
    components: {
        MyPreloader,
        UsersComponent
    },
    data: () => ({
        users: [ ],
        next_url: GET_URL,
        preloader: false
    }),
    methods: {
        async loadUsers() {
            this.preloader = true;
            let response = await fetch(this.next_url);
            if(response.status === 200) {
                let data = await response.text();

                let result = JSON.parse(data);

                result.total_pages === result.page ? this.next_url = '' : this.next_url = result.links.next_url;
                
                if(!(this.users.length)) {

                    this.users = result.users.map((value, idx, array) => {
                        return {
                            id: value.id,
                            ...array[idx]
                        }
                    })          
                } else {

                    const oldUsers = [...this.users];

                    const newUsers = result.users.map((value, idx, array) => {
                        return {
                            id: value.id,
                            ...array[idx]
                        }
                    })    
                    
                    this.users = oldUsers.concat(newUsers)
                }
            }
        },
        reset() {
            this.users = [];

            this.next_url = GET_URL;
            
            this.loadUsers();
        }
    },
    mounted() {
        this.loadUsers();
    },
    computed: {
        sortedUsers() {
            return [...this.users].sort((a, b) => {
                this.preloader = false;
                return b.registration_timestamp - a.registration_timestamp

                /*  Variant If timestamp = timestamp - sort by id 
                    Didn't implement it because there are too many with the same id */
                // if(a.registration_timestamp > b.registration_timestamp) return -1
                // else if(b.registration_timestamp > a.registration_timestamp) return 1
                // else {
                //     return a.id > b.id ? -1 : b.id > a.id ? 1 : 0
                // }
            })
        }
    }
}
</script>

<style lang="scss">
.get {
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 100%;
    }
    .btn {
        margin-top: 50px;
    }
}    

@media(max-width: 1023px) {
    .get .btn {
        margin-top: 49px;
    }
}
</style>