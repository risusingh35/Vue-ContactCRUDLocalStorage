<template>
    <div class="contact-details">
        <h2>Contact Details

        </h2>

        <h2 v-if="id">
            {{ id }}
        </h2>
        <div class="contact-info">
            <div class="field">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="contact.name" />
            </div>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="contact.email" />
            </div>
            <div class="field">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" v-model="contact.phone" />
            </div>
            <div class="field">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" v-model="contact.dob" />
            </div>
            <div class="field">
                <label for="notes">Notes:</label>
                <input type="text" id="notes" v-model="contact.notes" />
            </div>
            <div class="field">
                <label for="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" @change="handleFileChange" accept="image/*" />
            </div>
        </div>
        <button class="btn btn-primary" @click="saveContact">Save Contact</button>
    </div>
</template>
  
<script>

export default {

    data() {
        return {
            id: this.$route.query.id,
            validationErrors: '',
            contact: {
                name: "",
                email: "",
                phone: "",
                dob: "",
                notes: "",
                profilePicture: null
            },
        };
    },
    mounted() {
        if (this.id) {
            let selectedItem = JSON.parse(localStorage.getItem(this.id))
            console.log('selectedItem---', selectedItem);
            this.contact = selectedItem
        }

    },
    methods: {
        saveContact() {
            if (this.validateSubmitButton()) {
                if (this.id) {
                    localStorage.setItem(this.id, JSON.stringify(this.contact));
                } else {
                    let id = localStorage.length
                    this.contact['id'] = id
                    this.contact['isDeleted'] = 0
                    localStorage.setItem(id, JSON.stringify(this.contact));
                    alert('Contact Added Successfull')
                    this.$router.push({
                path: '/'
            });
                }

                console.log("Saving contact:", this.contact);
            } else {
                alert(this.validationErrors)
            }

        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                console.log("profilePicture contact:", file);
                this.contact.profilePicture = file.name;
            }
        },
        validateSubmitButton() {
            let valid = true;
            if (!this.contact.name) {
                this.validationErrors = "Name is required.";
                valid = false;
            }
            if (!this.contact.email) {
                this.validationErrors = "Email is required.";
                valid = false;
            }
            if (!this.contact.phone) {
                this.validationErrors = "Phone No. is required.";
                valid = false;
            }
            if (!this.contact.dob) {
                this.validationErrors = "Date of Birth is required.";
                valid = false;
            }
            if (!this.contact.notes) {
                this.validationErrors = "Notes is required.";
                valid = false;
            }
            if (!this.contact.profilePicture) {
                this.validationErrors = "profile Picture is required.";
                valid = false;
            }
            return valid;
        },
    },
};
</script>
  
<style scoped>
.contact-details {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.field {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
  