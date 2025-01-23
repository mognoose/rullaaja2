<template>
    <h1>Rullaaja</h1>
    <input type="text" v-model="user" placeholder="name">
    <input type="text" v-model="dice" placeholder="dice">
    <input type="text" v-model="channel" placeholder="channel">
    <input type="checkbox" v-model="discord" id="discord" /><label for="discord">Post to Discord</label>
    <button @click="roll">ROLL</button>
    {{ rnd }}
</template>

<script setup>
const config = useRuntimeConfig()
const user = ref('Sapatti');
const dice = ref(20);
const channel = ref(config.public.DEFAULT_CHANNEL);
const discord = ref(false)
const rnd = ref(0);

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

}

</script>