<template>

    <div>
        <banner title="投票列表"></banner>
        <group label-width="5em" title="投票列表:">
            <template v-if="vote.length">
                <cell  v-for="(item,key) in vote" primary="content" :title="item.title" :value="item.value" :key="key"></cell>
                <cell title="flex-start" align-items="flex-start" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
            </template>
            <template v-else>
                <p>No vote left!</p>
            </template>
        </group>
        <div style="margin:15px">
            <x-button class="mybtn" type="primary" text="返回" link="BACK"></x-button>
        </div>
    </div>
</template>

<script>
	export default {
		name: "show-list",
        data(){
	        return {
		        vote:[
                    {
                    	title:'aaaaa title',
                        value:'vvvafdlaf\nfdafdsa'
                    }
                ],
            }
        }
	}
</script>

<style scoped>

</style>
