'use client'

import {
    ArrowRightLeft,
    Eye
} from "lucide-react";
import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";
import { InputSelect } from "@/app/shared/components/Input/InputSelect";
import { ModalSchedullingDetail } from "@/app/shared/components/Modal/ModalSchedullingDetail";
import { transferItems } from "./data";
import { useState } from "react";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<(typeof transferItems)[0] | null>(null);

    function handleOpenDetail(item: typeof transferItems[0]) {
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    function handleCloseDetail() {
        setSelectedItem(null);
        setIsModalOpen(false);
    }

    return (
        <div className="min-h-screen bg-muted/30 pt-28 dark:bg-linear-to-tr dark:from-background dark:to-muted">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="space-y-6">
                    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                                <ArrowRightLeft className="h-3.5 w-3.5" />
                                Transferencia entre estoques
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    Transferir item entre estoques
                                </h1>
                                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                                    Selecione origem, destino, itens e confirmar a movimentacao.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
                        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Dados da transferencia
                                    </p>
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Origem e destino
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Estoque de origem</label>
                                    <InputSelect
                                        onChange={(event) => console.log("Event acionado")}
                                        value="CD Barueri"
                                    >
                                        <option value="CD Barueri">CD Barueri</option>
                                        <option value="CD São Paulo">CD São Paulo</option>
                                    </InputSelect>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Estoque de destino</label>
                                    <InputSelect
                                        onChange={(event) => console.log("Event acionado")}
                                        value="Hub Campinas"
                                    >
                                        <option value="Hub Campinas">Hub Campinas</option>
                                        <option value="Hub Rio de Janeiro">Hub Rio de Janeiro</option>
                                    </InputSelect>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Data</label>
                                    <Input type="date" defaultValue="2026-03-16" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Quantidade total</label>
                                    <Input value="400 unidades" readOnly />
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button>Confirmar transferencia</Button>
                                    <Button variant="secondary">Cancelar</Button>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Itens
                                    </p>
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Lista da transferencia
                                    </h2>
                                </div>
                                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                    {transferItems.length} itens
                                </span>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                                <div className="grid grid-cols-[1fr_1.8fr_0.8fr_0.8fr_1fr] gap-4 bg-muted/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    <span>SKU</span>
                                    <span>Descricao</span>
                                    <span>Disponivel</span>
                                    <span>Transferir</span>
                                    <span>Detalhes</span>
                                </div>
                                <div className="divide-y divide-border">
                                    {transferItems.map((item) => (
                                        <div
                                            key={item.sku}
                                            className="grid grid-cols-[1fr_1.8fr_0.8fr_0.8fr_1fr] gap-4 px-4 py-4 text-sm"
                                        >
                                            <span className="font-medium">{item.sku}</span>
                                            <span className="text-muted-foreground">{item.description}</span>
                                            <span>{item.available}</span>
                                            <span className="font-medium text-primary">{item.requested}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleOpenDetail(item)}
                                                className="flex items-center justify-center text-muted-foreground transition hover:text-foreground cursor-pointer"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
            </div>

            <ModalSchedullingDetail
                open={isModalOpen}
                onClose={handleCloseDetail}
                origin="CD Barueri"
                destination="Hub Campinas"
                item={selectedItem}
            />
        </div>
    );
}
