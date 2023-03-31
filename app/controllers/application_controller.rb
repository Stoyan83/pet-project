class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :handle_error if Rails.env.production?

  private

  def handle_error(e)
    render json: { error: e.to_s }, status: :bad_request
  end
end
