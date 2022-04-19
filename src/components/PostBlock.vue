<template>
    <section class="post" id="signup">
        <div class="container">
            <ui-heading>
                {{
                    success ? 'User successfully registered' 
                    : 'Working with POST request'
                }}
                </ui-heading>
            <form class="post__form" 
                @submit.prevent="submitForm"
                :class="success ? 'success' : ''"
                >
                <input-text 
                    :nameField="'username'"
                    v-model.trim="form.name"
                    :error="nameErrors"
                    :placeholder="'Your name'"></input-text>
                <input-text
                    :nameField="'email'"
                    v-model.trim="form.email"
                    :error="emailErrors"
                    :placeholder="'Email'"></input-text>
                <input-text
                    :nameField="'phone'"
                    :placeholder="'Phone'"
                    v-model="form.phone"
                    :error="phoneErrors"
                    :myMask="'+38 (###) ### - ## - ##'"
                    :helper="'+38 (XXX) XXX - XX - XX'"></input-text>
                <input-radio
                    :placeholder="'Select your position'"
                    :options="form.position.options"
                    :name="'position'"
                    :checkedId="form.position.active"
                    @change-option="(value) => form.position.active = Number(value)"
                ></input-radio>
                <input-file
                    :photoObject="form.photoObject.photo"
                    :error="photoErrors"
                    :nameField="'photo'"
                    @change-picture="changePicture"
                ></input-file>
                <ui-button
                    :type="'submit'"
                    :disabled="v$.$invalid"
                >Sign up</ui-button>
                <div class="error__form" v-if="errorMessage">{{ errorMessage + errorField}}</div>
            </form>
            <div class="success__pic"></div>
        </div>
    </section>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers, maxLength } from '@vuelidate/validators'

const LIMIT_FILE_SIZE = 5000; // this is limit size photo in kb
const LIMIT_FILE_PIXEL_SIZE = 70; // this is limit pixel size photo

const imageExt = helpers.regex(/\.jpe?g$/) 
const imageWeight = value =>  (value / 1024) < LIMIT_FILE_SIZE
const imageSize = value => value >= LIMIT_FILE_PIXEL_SIZE


export default {
    $emits: ['add-user'],
    data: () => ({
        v$: useVuelidate(),
        token: '123',
        success: false,
        errorMessage: '',
        errorField: '',
        form: {
            name: '',
            email: '',
            phone: '',
            position: {
                active: 1, // this is active option.id
                options: [
                    {
                        id: 1,
                        name: "Security"
                    },
                    {
                        id: 2,
                        name: "Designer"
                    },
                    {
                        id: 3,
                        name: "Content manager"
                    },
                    {
                        id: 4,
                        name: "Lawyer"
                    }
                ]
            },
            photoObject: {
                photo: {},
                photoSize: 0,
            },
        },
        position_url: 'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
        token_url: 'https://frontend-test-assignment-api.abz.agency/api/v1/token',
        registration_url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users'
        
    }),
    methods: {
        async getToken() {
            let response = await fetch(this.token_url);

            if(response.status === 200) {
                let data = await response.text();

                let result = JSON.parse(data);

                if(result.success) {
                    this.token = result.token
                }
            }
        },
        async sendForm() {
            let formData = new FormData();
            let formatPhone = this.form.phone.replace(/[\s-()]/g, '');

            formData.append('name', this.form.name);
            formData.append('email', this.form.email.toLowerCase());
            formData.append('phone', formatPhone);
            formData.append('position_id', this.form.position.active);
            formData.append('photo', this.form.photoObject.photo);

            const response = await fetch(this.registration_url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Token': this.token
                }
            })

            const dataResponse = await response.json();

            if(dataResponse.success) {
                this.success = true;
            } else {
                this.errorMessage = dataResponse.message;
                console.warn(dataResponse.message);
            }

        },
        submitForm() {
            if(!(this.v$.$invalid)) {

                this.sendForm();

            }
        },
        changePicture(e) {
            this.form.photoObject.photo = e.target.files[0];

            if(e.target.files[0]) {
                let reader = new FileReader();
    
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = (e) => {
                    
                    var image = new Image();
    
                    image.src = e.target.result;
                    image.addEventListener('load', (e) => {
                        e.target.width >= e.target.height 
                            ? this.form.photoObject.photoSize = e.target.height 
                            : this.form.photoObject.photoSize = e.target.width;
                    })
                } 
            }
        },
        async loadPositions() {
            let response = await fetch(this.position_url);
            if(response.status === 200) {
                let data = await response.text();

                let result = JSON.parse(data);


                if(result.success) {
                    this.form.position.options = [...result.positions]
                }

            }
                
        }
    },
    mounted() {
        this.loadPositions() // temp comment for optimized query
        this.getToken()
    },
    validations: {
        form: {
            name: { 
                required,
                minLength: minLength(2),
                maxLength: maxLength(60), // could be 'betwee'? - no
                $autoDirty:true,
            },
            email: { 
                required, 
                email,
                $autoDirty:true,
            },
            phone: { 
                required, 
                minLength: minLength(23),
                $autoDirty:true,
            },
            photoObject: {
                photo: {
                    required,
                    name: {
                        imageExt
                    },
                    size: {
                        imageWeight
                    },
                    $autoDirty:true,
                },
                photoSize: {
                    imageSize,
                    $autoDirty:true,
                }
            },
        }
    },
    computed: {
        nameErrors() {
            let error = '';
            if(this.v$.form.name.$error) {
                if(this.v$.form.name.required.$invalid) error = this.v$.form.name.required.$message
                else if(this.v$.form.name.minLength.$invalid) error = this.v$.form.name.minLength.$message
                else if(this.v$.form.name.maxLength.$invalid) error = this.v$.form.name.maxLength.$message
            }
            return error
        },
        emailErrors() {
            let error = '';
            if(this.v$.form.email.$error) {
                if(this.v$.form.email.required.$invalid) error = this.v$.form.email.required.$message
                else if(this.v$.form.email.email.$invalid) error = this.v$.form.email.email.$message
            }
            return error
        },
        phoneErrors() {
            let error = '';
            if(this.v$.form.phone.$error) {
                if(this.v$.form.phone.required.$invalid) error = this.v$.form.phone.required.$message
                else if(this.v$.form.phone.minLength.$invalid) error = 'This field must be completed completely'
            }
            return error
        },
        photoErrors() {
            let error = '';
            if(this.v$.form.photoObject.$error) {
                if(this.v$.form.photoObject.photo.required.$invalid) error = this.v$.form.photoObject.photo.required.$message
                else if(this.v$.form.photoObject.photo.name.imageExt.$invalid) error = 'Please select a picture (.jpg / .jpeg)'
                else if(this.v$.form.photoObject.photo.size.imageWeight.$invalid) error = `Please select a picture that is less than ${LIMIT_FILE_SIZE} KB`
                else if(this.v$.form.photoObject.photoSize.imageSize.$invalid) error = 'Select an image at least ' + LIMIT_FILE_PIXEL_SIZE + 'x' + LIMIT_FILE_PIXEL_SIZE +' pixels in size'
            }
            return error
        }
    },
    watch: {
        success() {
            this.$emit('add-user');
        }
    }
}
</script>

<style lang="scss">
.post {
    .post__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 380px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 2px;
        .btn {
            margin-top: 50px;
        }
        &.success {
            display: none;
        }
    }
    .form__elem-helper {
        padding-left: 16px;
        margin-top: 4px;
        font-size: 12px;
        line-height: 116%;
        color: #7e7e7e;
    }
    .form__elem-invalid {
        color: $error;
        padding-left: 16px;
        margin-top: 4px;
        font-size: 12px;
        line-height: 116%;
    }
    .success__pic {
        display: none;
        background: url('../assets/img/success.svg') top center/auto no-repeat;
        margin: 50px auto 0; 
        width: 328px;
        height: 290px;
    }
    .post__form.success ~ .success__pic {
        display: block;
    }
    .error__form {
        margin-top: 10px;
        background-color: rgba(255, 143, 143, 0.5);
        border: 1px solid red;
        color: $error;
        padding: 10px;
        border-radius: 7px;
    }
}

@media(max-width: 1199px) {
    .post .post__form .btn {
        margin-top: 49px;
    }
}

@media(max-width: 1023px) {
    .post .post__form {
        padding-top: 1px;
    }
}
</style>