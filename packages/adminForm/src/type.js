import outCom from '../../../examples/components/outCom'

export default {
    outCom: {
        render: (h) => {
            return <outCom></outCom>
        }
    },
    // 默认输入类型
    input: {
        // 对应到 Element 中的组件 tag
        tag: 'el-input',
        // 传递给 Element 组件的默认 props
        props: {
            clearable: true
        }
    },
    switch: {
        tag: 'el-switch',
        defaultValue: false
    },
    select: {
        props: {
            options: []
        },
        render: (h, { options, value }, listeners) => {
            return (
                <el-select value={value} onInput={(val) => { listeners.input(val) }}>
                    {options.map(option => {
                        return (
                            <el-option
                                {... {
                                    props: option
                                }
                                }
                            ></el-option>
                        );
                    })}
                </el-select>
            );
        }
    },
    radio: {
        props: {
            options: []
        },
        render: (h, { options, value }, listeners) => {
            return (
                <el-radio-group value={value} onInput={(val) => { listeners.input(val) }}>
                    {options.map(option => {
                        return (
                            <el-radio
                                {... {
                                    props: option
                                }
                                }
                            ></el-radio>
                        );
                    })}
                </el-radio-group>
            )
        }
    },
    checkbox: {
        props: {
            options: []
        },
        defaultValue: [],
        render: (h, { options, value }, listeners) => {
            return (
                <el-checkbox-group value={value} onInput={(val) => { listeners.input(val) }} >
                    {options.map(option => {
                        return (
                            <el-checkbox
                                {... {
                                    props: option
                                }
                                }
                            ></el-checkbox>
                        );
                    })}
                </el-checkbox-group>
            );
        }
    },
    button: {
        props: {
            label: '按钮'
        },
        render: (h, { label }) => {
            return (
                <el-button>{label}</el-button>
            )
        }
    }
}
