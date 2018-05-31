<template>

    <div>
        <group label-width="5em" title="投票列表:">
            <template v-if="vote.length">
                <cell primary="title" 
                      align-items="flex-start" v-for="item in vote"  @click.native="clickItem(item.id)"
                      :title="item.title" :key="item.id" is-link>
                    <flexbox orient="vertical">
                        <flexbox-item v-for="(opinion,oidx) in item.opinions" :key="oidx" >
                            <div class="flex-demo">{{(oidx+1)+'. ' + opinion}}</div>
                        </flexbox-item>
                    </flexbox>
                </cell>
            </template>
            <template v-else>
                <p>No vote left!</p>
            </template>
        </group>
        <div style="padding:15px 25%;">
            <x-button class="mybtn" type="primary" text="返回" @click.native="goBack"></x-button>
        </div>
    </div>
</template>

<script>
    import {Flexbox,FlexboxItem,} from 'vux';
	export default {
		name: "show-list",
        components:{
	        Flexbox,
	        FlexboxItem,
        },
        data(){
	        return {
		        vote:[
                    {
                    	id:"ccxx",
                    	title:'aaaaa tfdsafdsafitle',
                      //  value:'vvvafdlaf\nfdafdsa'
                        opinions:[
                        	'afdac','faaadacc'
                        ]
                    },
                    {
                    	id:"34324",
                    	title:'vvccdfsafdsafdsfdsfc',
	                    opinions:[
                        	'vdfdfcca','xxcc','xxfdsaaaaaaa','fdsf'
                        ]
                    }
                ],
            }
        },
        methods:{
			clickItem(id){
                console.log('click id',id);
                this.$router.push('/showvote/'+id);
            },
            goBack(){
                this.$goBack();
            }
        }
	}
</script>

<style scoped>
    .flex-demo {
        color: grey;
        border-radius: 4px;
        background-clip: padding-box;
    }
</style>
