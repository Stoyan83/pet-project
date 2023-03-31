# frozen_string_literal: true

module MessageRenderHelper
  def success_with_meta(blueprint = {}, options = {}, code = nil)
    code ||= :ok
    meta = options[:meta] || {}

    render json: { meta:, data: blueprint }, status: code
  end

  def success(blueprint = {}, code = nil)
    code ||= :ok

    render json: { data: blueprint }, status: code
  end

  def errors(errors, code = nil)
    code ||= :unprocessable_entity

    render json: { errors: }, status: code
  end
end
