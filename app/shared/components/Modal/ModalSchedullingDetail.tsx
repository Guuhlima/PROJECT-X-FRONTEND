'use client'

import { MapPin, Truck, X } from "lucide-react";
import Button from "../Button/Button";

interface ModalSchedullingDetailProps {
    open: boolean;
    onClose: () => void;
    origin: string;
    destination: string;
    item: {
        sku: string;
        description: string;
        available: number;
        requested: number;
        truck: {
            plate: string;
            driver: string;
            status: string;
            eta: string;
            latitude: number;
            longitude: number;
        };
    } | null;
}

export function ModalSchedullingDetail({ open, onClose, origin, destination, item }: ModalSchedullingDetailProps) {
    if (!open) return null;

    const mapUrl = item
        ? `https://maps.google.com/maps?q=${item.truck.latitude},${item.truck.longitude}&z=13&output=embed`
        : "";

    return (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-slate-900/30 px-4 py-8 backdrop-blur-sm">
            <div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">Detalhes da transferencia</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Item retirado e posicao atual do caminhao.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        icon={<X className="h-4 w-4" />}
                        iconOnly
                        aria-label="Fechar detalhes da transferencia"
                        onClick={onClose}
                    />

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">Origem</p>
                        <p className="font-medium">{origin}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Destino</p>
                        <p className="font-medium">{destination}</p>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.4fr]">
                    {item && (
                        <>
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-border p-4">
                                    <p className="text-sm text-muted-foreground">Item retirado</p>
                                    <div className="mt-3">
                                        <p className="font-medium">{item.sku}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl bg-muted/60 p-3">
                                            <p className="text-xs uppercase text-muted-foreground">Disponivel</p>
                                            <p className="mt-1 font-semibold">{item.available}</p>
                                        </div>
                                        <div className="rounded-xl bg-muted/60 p-3">
                                            <p className="text-xs uppercase text-muted-foreground">Retirado</p>
                                            <p className="mt-1 font-semibold text-primary">{item.requested}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-border p-4">
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-primary" />
                                        <p className="font-medium">Caminhao</p>
                                    </div>
                                    <div className="mt-4 space-y-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Placa</p>
                                            <p className="font-medium">{item.truck.plate}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Motorista</p>
                                            <p className="font-medium">{item.truck.driver}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Status</p>
                                            <p className="font-medium">{item.truck.status}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Previsao de chegada</p>
                                            <p className="font-medium">{item.truck.eta}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border p-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <p className="font-medium">Localizacao atual</p>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Posicao atual do caminhao no Google Maps.
                                </p>

                                <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                                    <iframe
                                        title="Localizacao do caminhao"
                                        src={mapUrl}
                                        className="h-94 w-full"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
