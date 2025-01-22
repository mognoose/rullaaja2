<template>
    <h1>test template</h1>
    <input type="text" v-model="user" placeholder="name">
    <input type="text" v-model="dice" placeholder="dice">
    <input type="text" v-model="channel" placeholder="channel">
    <input type="checkbox" v-model="discord" id="discord" /><label for="discord">Post to Discord</label>
    <button @click="roll">ROLL</button>
    {{ rnd }}
    <hr>
    <ul v-for="msg in messages?.rows">
        <li>{{ msg.message }}</li>
    </ul>
</template>

<script setup>
const config = useRuntimeConfig()
const user = ref('Sapatti');
const dice = ref(20);
const channel = ref(config.public.DEFAULT_CHANNEL);
const discord = ref(false)
const messages = ref()

const rnd = ref(0);

onMounted( async () => {
    await updateMessages();
})

const roll = async () => {
    const options = {
        method: 'post',
        body: {
            user: user.value,
            dice: dice.value,
            discord: discord.value,
            channel: channel.value,
        }
    }

    const res = await $fetch('/api/roll', options);
    console.log(res);
    
    rnd.value = res.rnd;

    updateMessages();
}

const updateMessages = async () => {
    messages.value = await $fetch('/api/messages');
}
</script>