<script setup>
    const props = defineProps({
        headerText: String,
        cancelText: {
            type: String,
            default: "Annuleer"
        },
        confirmText: {
            type: String,
            default: "Bevestig"
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
    })
</script>

<template>
    <div class="backdrop" @click.self.stop="$emit('cancel')">
        <section class="modal">
            <div class="header">
                <p>{{ headerText }}</p>
                <button @click.stop="$emit('cancel')">X</button>
            </div>
            <div class="body">
                <slot></slot>
            </div>
            <div class="footer">
                <button class="secondary" @click.stop="$emit('cancel')" v-if="showCancel">{{ cancelText }}</button>
                <button class="primary" @click.stop="$emit('confirm')" v-if="showConfirm">{{ confirmText }}</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .backdrop {
        background-color: rgba(0,0,0,0.5);
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        z-index: 999;
    }

    .modal {
        background-color: #042035;
        width: 500px;
        height: 400px;
        border: 1px solid #094563;
        border-radius: 10px;
    }

    .header {
        border-bottom: 1px solid #094563;
        height: 10%;
        position: relative;
        display: flex;
        align-items: center;
    }
    .header button {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 10px;
        background: none;
        font-size: 2rem;
        border: none;
        color: #aaa;
        cursor: pointer;
    }
    .header p {
        color: white;
        font-size: 1.2rem;
        margin-left: .5rem;
    }


    .body {
        height: 75%;
        margin-inline: 1rem;
    }

    .footer {
        height: 15%;
        border-top: 1px solid #094563;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .footer button {
        border: 1px solid #094563;
        border-radius: 5px;
        font-size: 1rem;
        padding: .25rem .5rem;
        cursor: pointer;
        height: 2.5rem;
    }

    .footer button.primary {
        background-color: #D5400A;
        color: white;
    }
    .footer button.secondary {
        background-color: #062c44;
        color: white;
    }
</style>