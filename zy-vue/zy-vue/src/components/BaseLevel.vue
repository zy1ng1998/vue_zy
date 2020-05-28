<script>
export default {
    functional:true,
    props:{
        level:{
            type:Number,
            required:true,
        }
    },

    render(h,context){
        console.log(context)
        const { props , slots} = context;
        console.log(props);
        console.log(slots());
        const tag ='h' + props.level
        return(
            <tag>
            { slots().default }
            </tag>
        )
    }
}
</script>