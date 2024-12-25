from nnsight import LanguageModel
import nnsight

gpt2_path = "/Users/caden/.cache/huggingface/hub/models--openai-community--gpt2/snapshots/607a30d783dfa663caf39e06633721c8d4cfcd7e"
model = LanguageModel(gpt2_path, dispatch=True)

remote = False
input0 = "When Lisa and Sarah went to the cinema, Lisa gave the ticket to"
input15 = "When Lisa and Sarah went to the cinema, Sarah gave the ticket to"
input3 = "When Lisa and Sarah went to the cinema, Sarah gave the ticket to"


def _function1(clean, corr, restored):
    # _Lisa: 15378
    # _Sarah: 10490

    _restored = restored[:, -1, 15378] - restored[:, -1, 10490]
    _corr = corr[:, -1, 10490] - corr[:, -1, 15378]
    _clean = clean[:, -1, 15378] - clean[:, -1, 10490]

    diff = (_restored - _corr) / (_clean - _corr)

    return diff.item()


def _function2(acts, corr, tok, layer):
    # Acts is a list of activations
    layer_act = acts[layer]

    # Return over the correct token
    token_act = layer_act[:, tok, :]

    corr[:, tok, :] = token_act

    return corr


with model.session(remote=remote) as session:
    with model.trace(input0) as tracer:
        list4 = nnsight.list()
        for loop2 in range(0, 12):
            module3 = model.transformer.h[loop2].output[0]
            list4.append(module3)
        module5 = model.lm_head.output

    with model.trace(input3) as tracer:
        module6 = model.lm_head.output

    with model.trace() as tracer:
        list16 = nnsight.list()
        for loop7 in range(0, 12):
            list15 = nnsight.list()
            for loop8 in range(0, 14):
                with tracer.invoke(input15):
                    module9 = model.transformer.h[loop7].output[0]
                    function2 = _function2(
                        acts=list4, corr=module9, tok=loop8, layer=loop7
                    )
                    model.transformer.h[loop7].output[0][:] = function2
                    module14 = model.lm_head.output
                    function1 = _function1(
                        clean=module5, corr=module6, restored=module14
                    )
                list15.append(function1)
            list16.append(list15)
    graph1 = list16.save()
# %%

print(graph1)
import matplotlib.pyplot as plt

plt.imshow(graph1)
plt.savefig("graph1.png")
